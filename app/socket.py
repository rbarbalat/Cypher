from flask_socketio import SocketIO, emit
from app.models import DirectMessage, db
import os

socketio = SocketIO()

if os.environ.get("FLASK_ENV") == "production":
    origins = ["http://cypher-app.onrender.com","https://cypher-app.onrender.com" ]
else:
    origins = "*"
socketio = SocketIO(cors_allowed_origins = origins)

@socketio.on("chat")
def handle_direct_messages(data):
    print(data, "ASIHNFOAKNEOGJKFNAKONGA")
    if data != "User connected!":
        dm = DirectMessage(
            sender_id = data["sender_id"],
            recipient_id = data["recipient_id"],
            message = data["message"],
        )
        db.session.add(dm)
        db.session.commit()
    emit("chat", data, broadcast=True)
