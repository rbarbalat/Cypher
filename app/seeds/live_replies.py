from app.models import db, LiveReplies, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice, randint
from faker import Faker

fake = Faker()

def seed_live_replies(users, live_chats):
    lr_list = []
    for i in range(0, 30):
        lr = LiveReplies(
            sender_id=choice(users).id,
            live_chat_id=choice(live_chats).id,
            message=fake.text(max_nb_chars=randint(300, 499))
        )
        db.session.add(lr)
        lr_list.append(lr)
    db.session.commit()
    return lr_list

def undo_live_replies():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.live_replies RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM live_replies"))

    db.session.commit()
