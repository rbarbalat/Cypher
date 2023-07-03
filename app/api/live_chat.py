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
    LiveChat
)
from flask_login import current_user
from app.forms import direct_mes_form
from app.forms import team_form
from app.forms.live_chat_form import LiveChatForm
from sqlalchemy import or_

live_chat_routes = Blueprint("chats", __name__)

#GET chat by id
@live_chat_routes.route('/<int:id>')
def get_chat(id):
  if not current_user.is_authenticated:
    return {"error": "go get logged in"}
  chat = LiveChat.query.get(id)
  if not chat:
        return {"error": "chat not found"}
  return chat.to_dict_no_assoc()

#EDIT chat by id

@live_chat_routes.route('/<int:id>', methods=['POST'])
def edit_chat(id):
  if not current_user.is_authenticated:
    return {"error": "go get logged in"}
  chat = LiveChat.query.get(id)
  if chat.sender_id != current_user.id:
    return {"error" : "not authorized"}
  form = LiveChatForm()
  form["csrf_token"].data = request.cookies["csrf_token"]
  if form.validate_on_submit():
    chat.message = form.data['message']
    db.session.commit()
    return chat.to_dict_no_assoc()
  return {"errors": form.errors}

@live_chat_routes.route('/<int:id>/delete')
def delete_chat(id):
  if not current_user.is_authenticated:
    return {"error": "go get logged in"}
  chat = LiveChat.query.get(id)
  if not chat:
    return {"error": "message not found"}
  if chat.sender_id != current_user.id:
    return {"error" : "not authorized"}
  db.session.delete(chat)
  db.session.commit()
  return {"message" : "message deleted :)"}
