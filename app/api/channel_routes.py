from flask import Blueprint, request
from app.models import Channel, db, ChannelMembership, TeamMembership, LiveChat, User
from flask_login import current_user
from app.forms.channel_form import ChannelForm
from sqlalchemy import or_
from app.forms.live_chat_form import LiveChatForm
from .team_routes import get_team_channel_user_for_delete

from sqlalchemy.orm import joinedload

channel_routes = Blueprint('channels', __name__)

#GET ALL CHANNELS
@channel_routes.route('/')
def get_channels():

    channels = Channel.query.options(
            joinedload(Channel.users).options(
                joinedload(ChannelMembership.user)
      )).all()

    if not channels:
        return []

    new_channels = [{
                      "id": channel.id,
                      "name": channel.name,
                      "description": channel.description,
                      "private": channel.private,
                      "team_id": channel.team_id,
                      "numMembers": len(channel.users),
                      "users": [ {**cm.user.to_dict(), "status": cm.status } for cm in channel.users ]
                    }
                    for channel in channels]

    return new_channels

#GET CHANNEL BY ID
@channel_routes.route('/<int:id>')
def get_channel_by_id(id):

    channel = Channel.query.filter(Channel.id == id).options(
            joinedload(Channel.users).options(
                joinedload(ChannelMembership.user)
      )).first()

    if not channel:
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
    channel = Channel.query.filter(Channel.id == id).options(
       joinedload(Channel.users).options(
        joinedload(ChannelMembership.user)
       )
    ).first()
    if not channel:
      return {"error": "channel does not exist"}, 404
    users = [{
                "id": cm.user.id,
                "username": cm.user.username,
                "status": cm.status
              }
              for cm in channel.users]
    return users


#DELETE A CHANNEL BY ID
@channel_routes.route('/<int:id>', methods = ["DELETE"])
def delete_channel(id):
    if not current_user.is_authenticated:
        return {"error" : "go get logged in"}, 403
    channel = Channel.query.get(id)
    if not channel:
       return {"error": "channel not found"}, 404

    team = channel.team
    if len(team.users) == 0:
       return {"error": "the channel belongs to a team with no users including admins"}, 404

    if len(channel.users) == 0:
       return {"error": "the channel has no users including no admin/owner"}, 404

    is_authorized_by_team = current_user.id in [tm.user_id for tm in team.users if tm.status in ["owner", "admin"]]
    is_authorized_by_channel = current_user.id in [cm.user_id for cm in channel.users if cm.status in ["owner", "admin"]]

    is_authorized = is_authorized_by_team or is_authorized_by_channel

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
  channel = Channel.query.get(id)
  if not channel:
     return {"error": "channel does not exist"}, 404

  team = channel.team
  userInTeam = current_user.id in [tm.user_id for tm in team.users]
  if not userInTeam:
     return {"error": "can't join a channel if you don't belong to the right team"}, 404

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
@channel_routes.route("/<int:chan_id>/member/<int:mem_id>", methods = ["DELETE"])
def delete_member_from_channel(chan_id, mem_id):
  if not current_user.is_authenticated:
    return {"error" : "go get logged in"}, 403

  channel = Channel.query.get(chan_id)
  if not channel:
    return {"error": "channel does not exist"}, 404

  team_id = channel.team.id
  team = channel.team

  #this is the cm to be deleted
  cm = ChannelMembership.query.filter(ChannelMembership.user_id == mem_id) \
                        .filter(ChannelMembership.channel_id == chan_id).first()
  if not cm:
     return {"error": "no such user"}, 404

  team_owner_id = [tm.user_id for tm in team.users if tm.status == "owner"][0]
  chan_owner_id = [cm.user_id for cm in channel.users if cm.status == "owner"][0]

  if cm.user_id == team_owner_id:
     return {"error": "team owner can't be removed from the channel"}, 403

  #the user trying to remove the chan_owner must be the chan_owner himself or team_owner
  if cm.status == "owner" and current_user.id not in [cm.user_id, team_owner_id]:
     return {"error": "unauthorized"}, 403

  # when chan_owner is removed the team owner becomes the new channel owner
  if cm.status == "owner" and current_user.id in [cm.user_id, team_owner_id]:
     db.session.delete(cm)
     db.session.commit()
     cm_of_team_owner = [cm for cm in channel.users if cm.user_id == team_owner_id][0]
     cm_of_team_owner.status = "owner"
     db.session.commit()
     return get_team_channel_user_for_delete(team_id, current_user.id)

  #regular user deletes himself
  if cm.user.id == current_user.id:
     db.session.delete(cm)
     db.session.commit()
     return get_team_channel_user_for_delete(team_id, current_user.id)

  #regular user is deleted by a channel_owner or team_owner
  if cm.status != "owner" and current_user.id in [chan_owner_id, team_owner_id]:
     db.session.delete(cm)
     db.session.commit()
     return get_team_channel_user_for_delete(team_id, current_user.id)

  #purpose of get_team_channel_user_for_delete is to get the right info to display
  #the page after the deletion
  return {"error": "Unauthorized backstop"}, 403

#GET all chats for channel
@channel_routes.route('/<int:id>/chats')
def get_all_chats_by_channel(id):
  channel = Channel.query.get(id)
  if not channel:
    return {"error": "channel not found"}, 404
  chats = LiveChat.query.filter(LiveChat.channel_id == id).order_by(LiveChat.created_at).all()
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
  return {"message": "member added"}
