from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, LiveReplies, db
from app.forms.live_reply_form import LiveReplyForm

live_reply_routes = Blueprint('live_replies', __name__)

#Delete replies
@live_reply_routes.route('/<int:id>', methods = ["DELETE"])
def delete_reply(id):
  if not current_user.is_authenticated:
    return {"error": "go get logged in"}, 403
  reply = LiveReplies.query.get(id)
  if not reply:
    return {"error": "message not found"}, 404
  if reply.sender_id != current_user.id:
    return {"error" : "not authorized"}, 403
  db.session.delete(reply)
  db.session.commit()
  return {"message" : "message deleted :)"}

#EDIT reply by id
@live_reply_routes.route('/<int:id>', methods=['PATCH'])
def edit_reply(id):
  if not current_user.is_authenticated:
    return {"error": "go get logged in"}, 403

  reply = LiveReplies.query.get(id)
  if not reply:
    return {"error": "the reply couldn't be found"}, 404

  if reply.sender_id != current_user.id:
    return {"error" : "not authorized"}, 403

  form = LiveReplyForm()
  form["csrf_token"].data = request.cookies["csrf_token"]

  if form.validate_on_submit():
    reply.message = form.data['message']
    db.session.commit()
    return reply.to_dict_no_assoc()

  return {"errors": form.errors}, 400
