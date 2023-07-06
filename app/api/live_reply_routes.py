from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, LiveReplies, db

live_reply_routes = Blueprint('live_replies', __name__)

@live_reply_routes.route('/<int:id>/delete')
def delete_reply(id):
  if not current_user.is_authenticated:
    return {"error": "go get logged in"}
  reply = LiveReplies.query.get(id)
  if not reply:
    return {"error": "message not found"}
  if reply.sender_id != current_user.id:
    return {"error" : "not authorized"}
  db.session.delete(reply)
  db.session.commit()
  return {"message" : "message deleted :)"}
