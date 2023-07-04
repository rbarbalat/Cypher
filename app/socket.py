from flask_socketio import SocketIO, emit
from app.models import DirectMessage, db
from datetime import datetime
import os
from app.api.direct_mes_routes import send_direct_messages, edit_direct_message

socketio = SocketIO()

if os.environ.get("FLASK_ENV") == "production":
    origins = ["http://cypher-app.onrender.com","https://cypher-app.onrender.com" ]
else:
    origins = "*"
socketio = SocketIO(cors_allowed_origins = origins)

@socketio.on("chat")
def handle_direct_messages(data):
    if data != "User connected!":
        dm = DirectMessage(
            sender_id = data["sender_id"],
            recipient_id = data["recipient_id"],
            message = data["message"],
            created_at = datetime.now()
        )
        db.session.add(dm)
        db.session.commit()
    # send_direct_messages(data["recipient_id"])
    emit("chat", data, broadcast=True)

#Update Chat
@socketio.on("update_chat")
def update_direct_message(data):
    id = data["id"]
    message = data["message"]
    print("printing message inside backend---", message)
    uc = DirectMessage.query.get(id)
    uc.message = message
    #probably don't need to add this to the database
    # db.session.add(uc)
    db.session.commit()
    print(uc.message)
    emit("update_chat", data, broadcast=True)

#Delete Chat
@socketio.on("delete_chat")
def delete_direct_message(data):
    id = data["id"]
    deleted_chat = DirectMessage.query.get(id)
    db.session.delete(deleted_chat)
    db.session.commit()
    emit("delete_chat", data, broadcast=True)
