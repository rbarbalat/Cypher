from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, LiveReplies, db
from app.forms.live_reply_form import LiveReplyForm

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

#EDIT reply by id
@live_reply_routes.route('/<int:id>', methods=['POST'])
def edit_reply(id):
  if not current_user.is_authenticated:
    return {"error": "go get logged in"}

  reply = LiveReplies.query.get(id)
  if not reply:
    return {"error": "the reply couldn't be found"}

  if reply.sender_id != current_user.id:
    return {"error" : "not authorized"}

  form = LiveReplyForm()
  form["csrf_token"].data = request.cookies["csrf_token"]

  if form.validate_on_submit():
    reply.message = form.data['message']
    db.session.commit()
    return reply.to_dict_no_assoc()

  return {"errors": form.errors}
