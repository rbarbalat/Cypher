from app import app
from app.models.db import db
from app.models.direct_messages import DirectMessage
from app.models.user import User

with app.app_context():
    user = User.query.get(3)
    print(user)
    arr = DirectMessage.query.filter(DirectMessage.sender_id == 3).all()
    print(arr)
    print(user.sent_messages)
    print(user.received_messages)
    db.session.commit()
