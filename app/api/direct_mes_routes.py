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
        return {"error": "go get logged in"}, 403

    sent_to_these_users = [ dm.recipient for dm in current_user.sent_messages]
    received_from_these_users = [dm.sender for dm in current_user.received_messages]

    #spread both groups into a set to get unique partners
    dm_partners = {*sent_to_these_users, *received_from_these_users}
    return [ {"id": partner.id, "partner": partner.username, "image": partner.image }
            for partner in dm_partners ]

#GET ROUTE FOR GETTING A MESSAGE
@direct_mes_routes.route("/<int:id>")
def get_message(id):
    if not current_user.is_authenticated:
        return {"error": "go get logged in"}, 403
    message = DirectMessage.query.get(id)
    if not message:
        return {"error": "message not found"}, 404
    if message.sender_id != current_user.id and message.recipient_id !=current_user.id:
        return {"error": "Not authorized to view this message"}, 403
    return {
            "id": message.id,
            "sender_id": message.sender.id,
            "recipient_id": message.recipient.id,
            "message": message.message,
            "created_at": message.created_at,
        }

# GET ALL MESSAGES BETWEEN 2 USERS
@direct_mes_routes.route("/partner/<int:id>")
def get_messages(id):
    # if not current_user.is_authenticated:
    #     return {"error": "go get logged in"}, 403
    messages = DirectMessage.query.filter(
        or_(DirectMessage.sender_id == current_user.id, DirectMessage.sender_id == id)
    ).filter(
        or_(
            DirectMessage.recipient_id == current_user.id,
            DirectMessage.recipient_id == id,
        )).order_by(DirectMessage.created_at).all()
    partner = User.query.get(id)
    if partner is None:
        return {"error": "partner does not exist"}, 404
    messages =  [{
            "id": message.id,
            "sender": message.sender.username,
            "recipient": message.recipient.username,
            "sender_id": message.sender.id,
            "recipient_id": message.recipient.id,
            "message": message.message,
            "created_at": message.created_at,
            "partner": id,
            "partner_name": partner.username,
            "image": partner.image if partner.image else None
        }for message in messages]
    return {"messages": messages, "user": partner.to_dict()}

@direct_mes_routes.route("/<int:id>", methods=["POST"])
def send_direct_messages(id):
    print("we are inside the send_direct_messages function")
    if not current_user.is_authenticated:
        return {"error": "go get logged in"}, 403
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
    return {"errors": form.errors}, 400


#EDIT MESSAGE

@direct_mes_routes.route('/<int:id>/edit', methods=["POST"])
def edit_direct_message(id):
    if not current_user.is_authenticated:
        return {"error": "go get logged in"}, 403
    message = DirectMessage.query.get(id)
    if message.sender_id != current_user.id:
        return {"error" : "not authorized"}, 403
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
    return {"errors": form.errors}, 400

#DELETE MESSAGE

@direct_mes_routes.route('/<int:id>/delete')
def delete_direct_message(id):
    if not current_user.is_authenticated:
        return {"error": "go get logged in"}, 403
    message = DirectMessage.query.get(id)
    if not message:
        return {"error": "message not found"}, 404
    if message.sender_id != current_user.id:
        return {"error" : "not authorized"}, 403
    db.session.delete(message)
    db.session.commit()
    return {"message" : "message deleted :)"}
