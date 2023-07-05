from app.models import db, LiveChat, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice
from faker import Faker
def seed_live_chats(users, channels):
    lc_list = []
    for i in range(0, 30):
        lc = LiveChat(
            sender_to_channel=choice(users),
            channel= channels[i // 5],
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt  culpa qui officia deserunt mollit anim est laborum."
        )
        db.session.add(lc)
        lc_list.append(lc)
    db.session.commit()
    return lc_list

def undo_live_chats():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.live_chats RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM live_chats"))

    db.session.commit()
