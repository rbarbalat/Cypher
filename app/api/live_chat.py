from flask import Blueprint, jsonify, request
# from flask_socketio import emit
from app.models import (
    Team,
    TeamMembership,
    User,
    db,
    Channel,
    ChannelMembership,
    DirectMessage,
    LiveChat,
    LiveReplies
)
from flask_login import current_user
from app.forms import direct_mes_form
from app.forms import team_form
from app.forms.live_chat_form import LiveChatForm
from app.forms.live_reply_form import LiveReplyForm
from sqlalchemy import or_

live_chat_routes = Blueprint("chats", __name__)

#GET chat by id
@live_chat_routes.route('/<int:id>')
def get_chat(id):
  if not current_user.is_authenticated:
    return {"error": "go get logged in"}, 403
  chat = LiveChat.query.get(id)
  if not chat:
        return {"error": "chat not found"}, 404
  return chat.to_dict_no_assoc()

#EDIT chat by id

@live_chat_routes.route('/<int:id>', methods=['POST'])
def edit_chat(id):
  if not current_user.is_authenticated:
    return {"error": "go get logged in"}, 403
  chat = LiveChat.query.get(id)
  if not chat:
    return {"error": "chat couldn't be found"}, 404
  if chat.sender_id != current_user.id:
    return {"error" : "not authorized"}, 403
  form = LiveChatForm()
  form["csrf_token"].data = request.cookies["csrf_token"]
  if form.validate_on_submit():
    chat.message = form.data['message']
    db.session.commit()
    return chat.to_dict_no_assoc()
  return {"errors": form.errors}, 400

@live_chat_routes.route('/<int:id>/delete')
def delete_chat(id):
  if not current_user.is_authenticated:
    return {"error": "go get logged in"}, 403
  chat = LiveChat.query.get(id)
  if not chat:
    return {"error": "message not found"}, 404
  if chat.sender_id != current_user.id:
    return {"error" : "not authorized"}, 403
  db.session.delete(chat)
  db.session.commit()
  return {"message" : "message deleted :)"}


#GET replies to chat with id
@live_chat_routes.route('/<int:id>/replies')
def get_replies_to_chat(id):
  if not current_user.is_authenticated:
    return {"error": "go get logged in"}, 403

  chat = LiveChat.query.get(id)
  if not chat:
        return {"error": "chat not found"}, 404

  return [ { **reply.to_dict_no_assoc(), "username": reply.sender_of_reply.id }
      for reply in chat.replies]


#CREATE A NEW LIVE REPLY
@live_chat_routes.route('/<int:id>/replies', methods=['POST'])
def send_live_reply(id):
  if not current_user.is_authenticated:
    return {"error": "go get logged in"}, 403
  chat = LiveChat.query.get(id)
  channel = chat.channel
  team = channel.team
  teamOwnerAdmin = current_user.id in [ tm.user_id for tm in team.users if tm.status in ["owner", "admin"] ]
  authorized = current_user.id in [ cm.user_id for cm in channel.users ]
  if not authorized and not teamOwnerAdmin:
    return {"error": "Not authorized to reply in this channel"}, 403
  form = LiveReplyForm()
  form["csrf_token"].data = request.cookies["csrf_token"]
  if form.validate_on_submit():
    reply = LiveReplies()
    form.populate_obj(reply)
    reply.sender_id = current_user.id
    reply.live_chat_id = id
    db.session.add(reply)
    db.session.commit()
    return reply.to_dict_no_assoc()
  return {"errors": form.errors}, 400
