from app.models import db, LiveChat, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice, randint
from faker import Faker

fake = Faker()

def seed_live_chats(users, channels):
    lc1 = LiveChat(
        sender_to_channel = users[0],
        channel = channels[0],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc2 = LiveChat(
        sender_to_channel = users[1],
        channel = channels[0],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc3 = LiveChat(
        sender_to_channel = users[1],
        channel = channels[1],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc4 = LiveChat(
        sender_to_channel = users[2],
        channel = channels[1],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc5 = LiveChat(
        sender_to_channel = users[2],
        channel = channels[2],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc6 = LiveChat(
        sender_to_channel = users[3],
        channel = channels[2],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc7 = LiveChat(
        sender_to_channel = users[3],
        channel = channels[3],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc8 = LiveChat(
        sender_to_channel = users[4],
        channel = channels[3],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc9 = LiveChat(
        sender_to_channel = users[4],
        channel = channels[4],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc10 = LiveChat(
        sender_to_channel = users[5],
        channel = channels[4],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc11 = LiveChat(
        sender_to_channel = users[5],
        channel = channels[5],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc12 = LiveChat(
        sender_to_channel = users[6],
        channel = channels[5],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc13 = LiveChat(
        sender_to_channel = users[6],
        channel = channels[6],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc14 = LiveChat(
        sender_to_channel = users[7],
        channel = channels[6],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc15 = LiveChat(
        sender_to_channel = users[7],
        channel = channels[7],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc16 = LiveChat(
        sender_to_channel = users[8],
        channel = channels[7],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc17 = LiveChat(
        sender_to_channel = users[8],
        channel = channels[8],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc18 = LiveChat(
        sender_to_channel = users[9],
        channel = channels[8],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc19 = LiveChat(
        sender_to_channel = users[7],
        channel = channels[9],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc20 = LiveChat(
        sender_to_channel = users[8],
        channel = channels[9],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc21 = LiveChat(
        sender_to_channel = users[7],
        channel = channels[10],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc22 = LiveChat(
        sender_to_channel = users[5],
        channel = channels[10],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc23 = LiveChat(
        sender_to_channel = users[6],
        channel = channels[11],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc24 = LiveChat(
        sender_to_channel = users[6],
        channel = channels[11],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc25 = LiveChat(
        sender_to_channel = users[6],
        channel = channels[12],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc26 = LiveChat(
        sender_to_channel = users[7],
        channel = channels[12],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc27 = LiveChat(
        sender_to_channel = users[7],
        channel = channels[13],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc28 = LiveChat(
        sender_to_channel = users[8],
        channel = channels[13],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc29 = LiveChat(
        sender_to_channel = users[8],
        channel = channels[14],
        message=fake.text(max_nb_chars=randint(300, 499))
    )
    lc30 = LiveChat(
        sender_to_channel = users[9],
        channel = channels[14],
        message=fake.text(max_nb_chars=randint(300, 499))
    )

    db.session.add(lc1)
    db.session.add(lc2)
    db.session.add(lc3)
    db.session.add(lc4)
    db.session.add(lc5)
    db.session.add(lc6)
    db.session.add(lc7)
    db.session.add(lc8)
    db.session.add(lc9)
    db.session.add(lc10)
    db.session.add(lc11)
    db.session.add(lc12)
    db.session.add(lc13)
    db.session.add(lc14)
    db.session.add(lc15)
    db.session.add(lc16)
    db.session.add(lc17)
    db.session.add(lc18)
    db.session.add(lc19)
    db.session.add(lc21)
    db.session.add(lc22)
    db.session.add(lc23)
    db.session.add(lc24)
    db.session.add(lc25)
    db.session.add(lc26)
    db.session.add(lc27)
    db.session.add(lc28)
    db.session.add(lc29)
    db.session.add(lc30)
    db.session.commit()
    return [lc1, lc2, lc3, lc4, lc5, lc6, lc7, lc8, lc9, lc10, lc11, lc12, lc13, lc14, lc15, lc16, lc17, lc18, lc19, lc20, lc21, lc22, lc23, lc24, lc25, lc26, lc27, lc28, lc29, lc30 ]

def undo_live_chats():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.live_chats RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM live_chats"))

    db.session.commit()
