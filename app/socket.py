from flask_socketio import SocketIO, emit, send, join_room, leave_room
from app.models import DirectMessage, db, LiveChat
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


# Named events are the most flexible, as they eliminate the need to include additional metadata to describe the message type. The names message, json, connect and disconnect are reserved and cannot be used for named events.

# where users receive messages from the room or rooms they are in, but not from other rooms where other users are

# @socketio.on('join')
# def on_join(data):
#     username = data['username']
#     room = data['room']
#     join_room(room)
#     send(username + ' has entered the room.', to=room)

# @socketio.on('leave')
# def on_leave(data):
#     username = data['username']
#     room = data['room']
#     leave_room(room)
#     send(username + ' has left the room.', to=room)

# When working with namespaces, send() and emit() use the namespace of the incoming message by default. A different namespace can be specified with the optional namespace argument:

# When a message is sent with the broadcast option enabled, all clients connected to the namespace receive it, including the sender.

#everytime client connects

@socketio.on('join', namespace="/direct")
def on_join(data):
    room = data['room']
    join_room(room)
    # join_room(request.sid)
    # request.sid is a user's session id

@socketio.on('join', namespace="/channel")
def on_join(data):
    room = data['room']
    join_room(room)

@socketio.on("chat", namespace="/direct")
def handle_direct_messages(data):
    if len(data["message"]) <= 2000 and len(data["message"]) > 0:
        dm = DirectMessage(
            sender_id = data["sender_id"],
            recipient_id = data["recipient_id"],
            message = data["message"],
            created_at = datetime.now()
        )
        db.session.add(dm)
        db.session.commit()
    # send_direct_messages(data["recipient_id"])
        emit("chat", data, room=[data["sender_id"], data["recipient_id"]])
    # emit(to = user with a session id)

#Update Chat
@socketio.on("update_chat", namespace="/direct")
def update_direct_message(data):
    if len(data["message"]) <= 2000 and len(data["message"]) > 0:
        id = data["id"]
        message = data["message"]
        print("printing message inside backend---", message)
        uc = DirectMessage.query.get(id)
        uc.message = message
    #probably don't need to add this to the database
    # db.session.add(uc)
        db.session.commit()
        print(uc.message)
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
    if len(data["message"]) <= 2000 and len(data["message"]) > 0:
        print("95.5 in socket.python")
        lc = LiveChat(
            sender_id = data["sender_id"],
            channel_id = data["channel_id"],
            message = data["message"],
            created_at = datetime.now()
        )
        db.session.add(lc)
        db.session.commit()
    # send_direct_messages(data["recipient_id"])
        emit("live_chat", data, room=f'Channel {data["channel_id"]}')

#Update Live chat
@socketio.on("update_live_chat", namespace = "/channel")
def update_live_chat(data):
    print(len(data["message"]), 'LOOK HERE!!!!!!!!!')
    if len(data["message"]) <= 2000 and len(data["message"]) > 0:

        id = data["id"]
        message = data["message"]
        print("printing message inside backend---", message)
        lc = LiveChat.query.get(id)
        lc.message = message
        db.session.commit()
        print(lc.message)
        emit("update_live_chat", data, room=f'Channel {data["channel_id"]}')

#Delete Live chat
@socketio.on("delete_live_chat", namespace = "/channel")
def delete_live_chat(data):
    id = data["id"]
    deleted_chat = LiveChat.query.get(id)
    db.session.delete(deleted_chat)
    db.session.commit()
    emit("delete_live_chat", data, room=f'Channel {data["channel_id"]}')
