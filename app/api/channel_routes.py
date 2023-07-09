from flask import Blueprint, request
from app.models import Channel, db, ChannelMembership, TeamMembership, LiveChat, User
from flask_login import current_user
from app.forms.channel_form import ChannelForm
from sqlalchemy import or_
from app.forms.live_chat_form import LiveChatForm
from .team_routes import get_team_channel_user_for_delete

channel_routes = Blueprint('channels', __name__)

#GET ALL CHANNELS
@channel_routes.route('/')
def get_channels():
    if not current_user.is_authenticated:
        return {"error" : "go get logged in"}, 403
    channels = Channel.query.all()
    # print("hello world")
    # print(channels)
    if len(channels) == 0:
        return []

    list_of_list_of_users = [ [ { **cm.user.to_dict(), "status": cm.status } for cm in channel.users] for channel in channels ]

    new_channels = [{
    "id": channel.id,
    "name": channel.name,
    "description": channel.description,
    "private": channel.private,
    "team_id": channel.team_id
    }
    for channel in channels]

    for i, user_list in enumerate(list_of_list_of_users, start = 0):
    # print(i)
      new_channels[i]["users"] = user_list
      new_channels[i]["numMembers"] = len(user_list)

    return new_channels

#GET CHANNEL BY ID
@channel_routes.route('/<int:id>')
def get_channel_by_id(id):
    if not current_user.is_authenticated:
        return {"error" : "go get logged in"}, 403
    channel = Channel.query.get(id)
    if channel is None:
        return {"error": "Channel not found"}, 404

    users = [ { **cm.user.to_dict(), "status": cm.status } for cm in channel.users]
    numMembers = len(users)
    return {
        'id': channel.id,
        'name': channel.name,
        'private': channel.private,
        'team_id': channel.team_id,
        "description": channel.description,
        "users": users,
        "numMembers": numMembers
        }

#GET MEMBERS OF A CHANNEL
@channel_routes.route('/<int:id>/members')
def get_members_for_channel(id):
    if not current_user.is_authenticated:
        return {"error" : "go get logged in"}, 403
    channel = Channel.query.get(id)
    if channel is None:
      return {"error": "channel does not exist"}, 404
    users = [{
        "id":membership.user.id,
        "username":membership.user.username,
        "status": membership.status
              } for membership in channel.users]
    return users


#DELETE A CHANNEL BY ID
@channel_routes.route('/<int:id>/delete')
def delete_channel(id):
    if not current_user.is_authenticated:
        return {"error" : "go get logged in"}, 403
    channel = Channel.query.get(id)
    if channel is None:
       return {"error": "channel not found"}, 404

    team = channel.team
    #shouldn't happen but informative error in development, prevents keying into none
    if len(team.users) == 0:
       return {"error": "the channel belongs to a team with no users including admins"}, 404

    #shouldn't happen but informatiave error in development, prevents keying into none
    if len(channel.users) == 0:
       return {"error": "the channel has no users including no admin/owner"}, 404

    is_authorized_by_team = current_user.id in [tm.user_id for tm in team.users if tm.status in ["owner", "admin"]]
    is_authorized_by_channel = current_user.id in [cm.user_id for cm in channel.users if cm.status in ["owner", "admin"]]

    is_authorized = is_authorized_by_team or is_authorized_by_channel
     #can be authorized by being an owner/admin of the team or channel

    if not is_authorized:
        return {"error" : "not authorized"}, 403
    db.session.delete(channel)
    db.session.commit()
    return {"message" : "channel deleted :)"}

#add member to channel
@channel_routes.route('/<int:id>/members', methods=['POST'])
def add_member_to_channel(id):
  if not current_user.is_authenticated:
    return {"error" : "go get logged in"}, 403
  #need a check to make sure the user is a member of the team that the channel belongs to
  channel = Channel.query.get(id)
  if not channel:
     return {"error": "channel does not exist"}, 404

  #late addition
  team = channel.team
  userInTeam = current_user.id in [tm.user_id for tm in team.users]
  if not userInTeam:
     return {"error": "can't join a channel if you don't belong to the right team"}, 404
  #late addition

  team_id = channel.team.id
  isOwner = TeamMembership.query.filter(TeamMembership.user_id == current_user.id).filter(or_(TeamMembership.status == "admin", TeamMembership.status == "owner")).filter(team_id == TeamMembership.team_id).first()
  isAlreadyMember = ChannelMembership.query.filter(ChannelMembership.user_id == current_user.id).filter(ChannelMembership.channel_id == id).first()
  if channel.private and not isOwner:
    return {"error" : "not authorized"}, 403
  if isAlreadyMember:
      return {"error" : "you've already joined"}, 500
  cm = ChannelMembership(
    user = current_user,
    channel = channel,
    status = "admin" if isOwner else "member"
  )
  db.session.add(cm)
  db.session.commit()
  return {"message":"added"}

# DELETE member of channel
@channel_routes.route("/<int:chan_id>/member/<int:mem_id>")
def delete_member_from_channel(chan_id, mem_id):
  if not current_user.is_authenticated:
    return {"error" : "go get logged in"}, 403

  channel = Channel.query.get(chan_id)
  if channel is None:
    return {"error": "channel does not exist"}, 404
  team_id = channel.team.id
  team = channel.team
  #this is the cm to be deleted
  cm = ChannelMembership.query.filter(ChannelMembership.user_id == mem_id).filter(ChannelMembership.channel_id == chan_id).first()
  if not cm:
     return {"error": "no such user"}, 404

   # the user to be deleted is the owner but it is not the owner trying to delete himself
  if cm.status == "owner" and cm.user_id != current_user.id:
     print("this if statement")
     return {"error": "unauthorized"}, 403

  #THIS CASE NEEDS TO BE CLARIFIED, PICKING A NEW OWNER?
  #owner deletes himself and a new owner is randomly chosen
  if cm.status == "owner" and cm.user_id == current_user.id:
    #  db.session.delete(cm)
    #  db.session.commit()
    #  return {"message": "successfully deleted"}
    return {"error": "channel owner can't delete his own membership"}, 403

    #regular user deletes himself
  if cm.user.id == current_user.id:
     db.session.delete(cm)
     db.session.commit()
    #  return {"message": "successfully deleted"}
     return get_team_channel_user_for_delete(team_id, current_user.id)
  #an owner or admin deletes a user
  elif current_user.id in [ chan_men.user.id for chan_men in
                           ChannelMembership.query.filter(ChannelMembership.status != "member").filter(ChannelMembership.channel_id == chan_id).all() ]:
    db.session.delete(cm)
    db.session.commit()
    # return {"message": "successfully deleted"}
    return get_team_channel_user_for_delete(team_id, current_user.id)
  elif current_user.id in [ tm.user_id for tm in team.users if tm.status in ['owner', 'admin']]:
    db.session.delete(cm)
    db.session.commit()
    return get_team_channel_user_for_delete(team_id, current_user.id)
  return {"error": "Unauthorized"}, 403

#GET all chats for channel
@channel_routes.route('/<int:id>/chats')
def get_all_chats_by_channel(id):
  if not current_user.is_authenticated:
    return {"error": "go get logged in"}, 403
  channel = Channel.query.get(id)
  if not channel:
    return {"error": "channel not found"}, 404
  chats = LiveChat.query.filter(LiveChat.channel_id == id).order_by(LiveChat.created_at).all()
  # return {"chats":[chat.to_dict_no_assoc() for chat in chats]}
  return [ {
            **chat.to_dict_no_assoc(),
            "username": chat.sender_to_channel.username,
            "image": chat.sender_to_channel.image
            }
            for chat in chats]

#POST chat
@channel_routes.route('/<int:id>/chats', methods=['POST'])
def send_live_chat(id):
  if not current_user.is_authenticated:
    return {"error": "go get logged in"}, 403
  channel_membership = ChannelMembership.query.filter_by(channel_id=id, user_id=current_user.id).first()
  if not channel_membership:
    return {"error": "Not authorized to post in this channel"}, 403
  form = LiveChatForm()
  form["csrf_token"].data = request.cookies["csrf_token"]
  if form.validate_on_submit():
    chat = LiveChat()
    form.populate_obj(chat)
    chat.sender_id = current_user.id
    chat.channel_id = id
    db.session.add(chat)
    db.session.commit()
    return chat.to_dict_no_assoc()
  #ON FORMS errors instead of error key, keep for now?
  return {"errors": form.errors}, 400


#authorized member adds another user to a channel
@channel_routes.route('/<int:id>/members/<int:user_id>', methods=['POST'])
def auth_user_adds_member_to_channel(id, user_id):
  if not current_user.is_authenticated:
    return {"error" : "go get logged in"}, 403

  channel = Channel.query.get(id)
  if not channel:
     return {"error": "channel does not exist"}, 404

  userToAdd = User.query.get(user_id)
  if not userToAdd:
     return {"error": "user does not exist"}, 404

  team = channel.team

  currentIsChannelOwner = current_user.id in [ cm.user_id for cm in current_user.channels if cm.status == "owner"]

  authTeamIds = [ tm.user_id for tm in team.users if tm.status in ["owner, admin"] ]
  currentIsTeamAuthorized = current_user.id in authTeamIds

  if not currentIsChannelOwner and not currentIsTeamAuthorized:
     return {"error": "not authoried for this action"}, 403

  alreadyInChannel = userToAdd.id in [cm.user_id for cm in channel.users]
  if alreadyInChannel:
     return {"error": "user already a member"}, 404

  inRightTeam = userToAdd.id in [tm.user_id for tm in team.users]
  if not inRightTeam:
     return {"error": "user can't be added to the channel b/c not in the right team"}, 404

  cm = ChannelMembership(channel=channel, user=userToAdd, status = "member")
  db.session.add(cm)
  db.session.commit()
  print(cm)
  return {"message": "member added"}
