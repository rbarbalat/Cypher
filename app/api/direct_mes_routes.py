from flask import Blueprint, jsonify, request
from flask_socketio import emit
from app.models import (
    Team,
    TeamMembership,
    User,
    db,
    Channel,
    ChannelMembership,
    DirectMessage,
)
from flask_login import current_user
from app.forms import direct_mes_form
from app.forms import team_form
from app.forms.channel_form import ChannelForm
from sqlalchemy import or_

direct_mes_routes = Blueprint("messages", __name__)


# GET ALL USERS THE CURRENT LOGGED IN USERS DIRECT MESSAGING
@direct_mes_routes.route("/")
def get_direct_messages():
    if not current_user.is_authenticated:
        return {"error": "go get logged in"}
    recipient_users = set()
    messages = DirectMessage.query.filter(
        DirectMessage.sender_id.in_([current_user.id]),
        ).order_by(DirectMessage.created_at).all()

    for message in messages:
        recipient_users.add((message.recipient.username, message.recipient.id))
    return [
        {"id": recipient[1], "recipient": recipient[0]} for recipient in recipient_users
    ]

#GET ROUTE FOR GETTING A MESSAGE
@direct_mes_routes.route("/<int:id>")
def get_message(id):
    if not current_user.is_authenticated:
        return {"error": "go get logged in"}
    message = DirectMessage.query.get(id)
    if not message:
        return {"error": "message not found"}
    if message.sender_id != current_user.id and message.recipient_id !=current_user.id:
        return {"error": "Not authorized to view this message"}
    return {
            "id": message.id,
            "sender_id": message.sender.id,
            "recipient_id": message.recipient.id,
            "message": message.message,
            "created_at": message.created_at
        }

# GET ALL MESSAGES BETWEEN 2 USERS
@direct_mes_routes.route("/recipient/<int:id>")
def get_messages(id):
    if not current_user.is_authenticated:
        return {"error": "go get logged in"}
    messages = DirectMessage.query.filter(
        or_(DirectMessage.sender_id == current_user.id, DirectMessage.sender_id == id)
    ).filter(
        or_(
            DirectMessage.recipient_id == current_user.id,
            DirectMessage.recipient_id == id,
        )).order_by(DirectMessage.created_at).all()

    return [{
            "id": message.id,
            "sender": message.sender.username,
            "recipient": message.recipient.username,
            "sender_id": message.sender.id,
            "recipient_id": message.recipient.id,
            "message": message.message,
            "created_at": message.created_at,
        }for message in messages]

@direct_mes_routes.route("/<int:id>", methods=["POST"])
def send_direct_messages(id):
    if not current_user.is_authenticated:
        return {"error": "go get logged in"}
    form = direct_mes_form.DirectMessageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        message = DirectMessage()
        form.populate_obj(message)
        message.sender_id = current_user.id
        message.recipient_id = id
        db.session.add(message)
        db.session.commit()
        return {
            "id": message.id,
            "sender_id": message.sender_id,
            "recipient_id": message.recipient_id,
            "message": message.message,
            "created_at": message.created_at
        }
    return {"errors": form.errors}


#EDIT MESSAGE

@direct_mes_routes.route('/<int:id>/edit', methods=["POST"])
def edit_direct_message(id):
    if not current_user.is_authenticated:
        return {"error": "go get logged in"}
    message = DirectMessage.query.get(id)
    if message.sender_id != current_user.id:
        return {"error" : "not authorized"}
    form = direct_mes_form.DirectMessageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        message.message = form.data['message']
        db.session.commit()
        return {
            "id": message.id,
            "sender_id": message.sender_id,
            "recipient_id": message.recipient_id,
            "message": message.message,
            "created_at": message.created_at
        }
    return {"errors": form.errors}

#DELETE MESSAGE

@direct_mes_routes.route('/<int:id>/delete')
def delete_direct_message(id):
    if not current_user.is_authenticated:
        return {"error": "go get logged in"}
    message = DirectMessage.query.get(id)
    if not message:
        return {"error": "message not found"}
    if message.sender_id != current_user.id:
        return {"error" : "not authorized"}
    db.session.delete(message)
    db.session.commit()
    return {"message" : "message deleted :)"}
