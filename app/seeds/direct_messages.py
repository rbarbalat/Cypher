from app.models import db, DirectMessage, environment, SCHEMA
from sqlalchemy.sql import text
from random import sample

def seed_direct_messages(users):
    for i in range(0, 10):
        pair = sample(users, 2)
        dm = DirectMessage(
            sender=pair[0],
            recipient=pair[1],
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        )
        db.session.add(dm)
    db.session.commit()



def undo_direct_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.direct_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM direct_messages"))

    db.session.commit()
