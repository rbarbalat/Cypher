from flask_socketio import SocketIO, emit, send, join_room, leave_room
from app.models import DirectMessage, db, LiveChat, LiveReplies
from datetime import datetime
import os
from app.api.direct_mes_routes import send_direct_messages, edit_direct_message
from flask import request

socketio = SocketIO()

if os.environ.get("FLASK_ENV") == "production":
    origins = ["http://cypher-app.onrender.com","https://cypher-app.onrender.com" ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins = origins)


@socketio.on('join', namespace="/direct")
def on_join(data):
    room = data['room']
    join_room(room)

@socketio.on('join', namespace="/channel")
def on_join(data):
    room = data['room']
    join_room(room)

@socketio.on("chat", namespace="/direct")
def handle_direct_messages(data):
    dm = DirectMessage(
        sender_id = data["sender_id"],
        recipient_id = data["recipient_id"],
        message = data["message"],
        created_at = datetime.utcnow()
    )
    db.session.add(dm)
    db.session.commit()
    emit("chat", data, room=[data["sender_id"], data["recipient_id"]])

#Update Chat
@socketio.on("update_chat", namespace="/direct")
def update_direct_message(data):
    id = data["id"]
    message = data["message"]
    uc = DirectMessage.query.get(id)
    uc.message = message
    db.session.commit()
    emit("update_chat", data, room=[data["sender_id"], data["recipient_id"]])

#Delete Chat
@socketio.on("delete_chat", namespace="/direct")
def delete_direct_message(data):
    id = data["id"]
    deleted_chat = DirectMessage.query.get(id)
    db.session.delete(deleted_chat)
    db.session.commit()
    emit("delete_chat", data, room=[data["sender_id"], data["recipient_id"]])

@socketio.on("live_chat", namespace="/channel")
def handle_live_chat(data):
    lc = LiveChat(
        sender_id = data["sender_id"],
        channel_id = data["channel_id"],
        message = data["message"],
        created_at = datetime.utcnow()
    )
    db.session.add(lc)
    db.session.commit()
    emit("live_chat", data, room=f'Channel {data["channel_id"]}')

#Update Live chat
@socketio.on("update_live_chat", namespace = "/channel")
def update_live_chat(data):
    id = data["id"]
    message = data["message"]
    lc = LiveChat.query.get(id)
    lc.message = message
    db.session.commit()
    emit("update_live_chat", data, room=f'Channel {data["channel_id"]}')

#Delete Live chat
@socketio.on("delete_live_chat", namespace = "/channel")
def delete_live_chat(data):
    id = data["id"]
    deleted_chat = LiveChat.query.get(id)
    db.session.delete(deleted_chat)
    db.session.commit()
    emit("delete_live_chat", data, room=f'Channel {data["channel_id"]}')

#Send live reply
@socketio.on("live_reply", namespace="/channel")
def handle_live_reply(data):

    lc = LiveReplies(
        sender_id = data["sender_id"],
        live_chat_id = data["live_chat_id"],
        message = data["message"],
    )
    db.session.add(lc)
    db.session.commit()
    emit("live_chat", data, room=f'Channel {data["channel_id"]}')

#Update Live reply
@socketio.on("update_live_reply", namespace = "/channel")
def update_live_reply(data):
    id = data["id"]
    message = data["message"]
    lr = LiveReplies.query.get(id)
    lr.message = message
    db.session.commit()
    emit("update_live_chat", data, room=f'Channel {data["channel_id"]}')

#Delete Live reply
@socketio.on("delete_live_reply", namespace = "/channel")
def delete_live_reply(data):
    id = data["id"]
    deleted_reply = LiveReplies.query.get(id)
    db.session.delete(deleted_reply)
    db.session.commit()
    emit("delete_live_chat", data, room=f'Channel {data["channel_id"]}')
