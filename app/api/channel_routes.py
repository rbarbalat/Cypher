from flask import Blueprint, request
from app.models import Channel, db, ChannelMembership, TeamMembership, LiveChat
from flask_login import current_user
from app.forms.channel_form import ChannelForm
from sqlalchemy import or_
from app.forms.live_chat_form import LiveChatForm
channel_routes = Blueprint('channels', __name__)

#GET ALL CHANNELS
@channel_routes.route('/')
def get_channels():
    if not current_user.is_authenticated:
        return {"error" : "go get logged in"}
    channels = Channel.query.all()
    # print("hello world")
    # print(channels)
    if len(channels) == 0:
        return []

    list_of_list_of_users = [ [cm.user.to_dict() for cm in channel.users] for channel in channels ]

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
        return {"error" : "go get logged in"}
    channel = Channel.query.get(id)
    if channel is None:
        return {"error": "Channel not found"}

    users = [cm.user.to_dict() for cm in channel.users]
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
        return {"error" : "go get logged in"}
    channel = Channel.query.get(id)
    users = [{
        "id":membership.user.id,
        "username":membership.user.username
              } for membership in channel.users]
    return users


#DELETE A CHANNEL BY ID
@channel_routes.route('/<int:id>/delete')
def delete_channel(id):
    if not current_user.is_authenticated:
        return {"error" : "go get logged in"}
    channel = Channel.query.get(id)
    if channel is None:
       return {"error": "channel not found"}

    team = channel.team
    #shouldn't happen but informative error in development, prevents keying into none
    if len(team.users) == 0:
       return {"error": "the channel belongs to a team with no users including admins"}

    #shouldn't happen but informatiave error in development, prevents keying into none
    if len(channel.users) == 0:
       return {"error": "the channel has no users including no admin/owner"}

    #replaced this query with something cleaner for now, keeping it as a reference
    #is_authorized = ChannelMembership.query.filter(ChannelMembership.user_id == current_user.id).filter(or_(ChannelMembership.status == "admin", ChannelMembership.status == "owner")).filter(ChannelMembership.channel_id == id).first()

    is_authorized_by_team = current_user.id in [tm.user_id for tm in team.users if tm.status in ["owner", "admin"]]
    is_authorized_by_channel = current_user.id in [cm.user_id for cm in channel.users if cm.status in ["owner", "admin"]]

    is_authorized = is_authorized_by_team or is_authorized_by_channel
     #can be authorized by being an owner/admin of the team or channel

    if not is_authorized:
        return {"error" : "not authorized"}
    db.session.delete(channel)
    db.session.commit()
    return {"message" : "channel deleted :)"}

@channel_routes.route('/<int:id>/members', methods=['POST'])
def add_member_to_channel(id):
  if not current_user.is_authenticated:
    return {"error" : "go get logged in"}
  channel = Channel.query.get(id)
  team_id = channel.team.id
  isOwner = TeamMembership.query.filter(TeamMembership.user_id == current_user.id).filter(or_(TeamMembership.status == "admin", TeamMembership.status == "owner")).filter(team_id == TeamMembership.team_id).first()
  isAlreadyMember = ChannelMembership.query.filter(ChannelMembership.user_id == current_user.id).filter(ChannelMembership.channel_id == id).first()
  if channel.private and not isOwner:
    return {"error" : "not authorized"}
  if isAlreadyMember:
      return {"error" : "you've already joined"}
  cm = ChannelMembership(
    user = current_user,
    channel = channel,
    status = "admin" if isOwner else "member"
  )
  db.session.add(cm)
  db.session.commit()
  return {"message":"added"}

# DELETE
@channel_routes.route("/<int:chan_id>/member/<int:mem_id>")
def delete_member_from_channel(chan_id, mem_id):
  if not current_user.is_authenticated:
    return {"error" : "go get logged in"}
  print("PRINTING CURRENT USER ----  ", current_user.id)

  #this is the cm to be deleted
  cm = ChannelMembership.query.filter(ChannelMembership.user_id == mem_id).filter(ChannelMembership.channel_id == chan_id).first()
  if not cm:
     return {"error": "no such user"}

   # the user to be deleted is the owner but it is not the owner trying to delete himself
  if cm.status == "owner" and cm.user_id != current_user.id:
     return {"error": "unauthorized"}

  #owner deletes himself and a new owner is randomly chosen
  if cm.status == "owner" and cm.user_id == current_user.id:
     db.session.delete(cm)
     db.session.commit()
     return {"message": "successfully deleted"}

    #regular user deletes himself
  if cm.user.id == current_user.id:
     db.session.delete(cm)
     db.session.commit()
     return {"message": "successfully deleted"}
  #an owner or admin deletes a user
  elif current_user.id in [ chan_men.user.id for chan_men in
                           ChannelMembership.query.filter(ChannelMembership.status != "member").filter(ChannelMembership.channel_id == chan_id).all() ]:
    db.session.delete(cm)
    db.session.commit()
    return {"message": "successfully deleted"}

  return {"error": "Unauthorized"}

#GET all chats for channel
@channel_routes.route('/<int:id>/chats')
def get_all_chats_by_channel(id):
  if not current_user.is_authenticated:
    return {"error": "go get logged in"}
  channel = Channel.query.get(id)
  if not channel:
    return {"error": "channel not found"}
  chats = LiveChat.query.filter(LiveChat.channel_id == id).order_by(LiveChat.created_at).all()
  # return {"chats":[chat.to_dict_no_assoc() for chat in chats]}
  return [chat.to_dict_no_assoc() for chat in chats]

#POST chat
@channel_routes.route('/<int:id>/chats', methods=['POST'])
def send_live_chat(id):
  if not current_user.is_authenticated:
    return {"error": "go get logged in"}
  channel_membership = ChannelMembership.query.filter_by(channel_id=id, user_id=current_user.id).first()
  if not channel_membership:
    return {"error": "Not authorized to post in this channel"}
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
  return {"errors": form.errors}
