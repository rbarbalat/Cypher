from flask_socketio import SocketIO, emit
from app.models import DirectMessage, db
from datetime import datetime
import os

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
    emit("chat", data, broadcast=True)

#Update Chat
@socketio.on("update_chat")
def handle_direct_messages(data):
    id = data["id"]
    message = data["message"]
    uc = DirectMessage.query.get(id)
    uc.message = message
    db.session.add(uc)
    db.session.commit()
    print(uc.message)
    emit("update_chat", data, broadcast=True)
