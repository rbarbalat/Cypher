from app.models import db, LiveChat, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice, randint
from faker import Faker
from datetime import datetime

fake = Faker()

def seed_live_chats(users, channels):
    lc1 = LiveChat(
        sender_to_channel = users[0],
        channel = channels[0],
        # message=fake.text(max_nb_chars=randint(300, 499)),
        message = "I'm looking for a good recipe for blueberry waffles, anyone willing to share?",
        created_at = datetime(2023, 1, 1, 15)
    )
    lc2 = LiveChat(
        sender_to_channel = users[1],
        channel = channels[0],
        # message=fake.text(max_nb_chars=randint(300, 499)),
        message = "My recipe is way to good to share, keeping it all for myself",
        created_at = datetime(2023, 1, 2, 15)
    )
    lc3 = LiveChat(
        sender_to_channel = users[1],
        channel = channels[1],
        # message=fake.text(max_nb_chars=randint(300, 499)),
        message = "Help! I'm out of maple syrup what can I do?",
        created_at = datetime(2023, 1, 3, 15)
    )
    lc4 = LiveChat(
        sender_to_channel = users[2],
        channel = channels[1],
        # message=fake.text(max_nb_chars=randint(300, 499)),
        message = "Honey is a decent alternative",
        created_at = datetime(2023, 1, 4, 15)
    )
    lc5 = LiveChat(
        sender_to_channel = users[2],
        channel = channels[2],
        # message=fake.text(max_nb_chars=randint(300, 499)),
        message = "crispy concoctions is an all time great channel name",
        created_at = datetime(2023, 1, 5, 15)
    )
    lc6 = LiveChat(
        sender_to_channel = users[3],
        channel = channels[2],
        # message=fake.text(max_nb_chars=randint(300, 499)),
        message = "definitely the best named channel on Cypher",
        created_at = datetime(2023, 1, 6, 15)
    )
    lc7 = LiveChat(
        sender_to_channel = users[3],
        channel = channels[3],
        # message=fake.text(max_nb_chars=randint(300, 499)),
        message = "I'm trapped in a place with only instant coffee for a week!",
        created_at = datetime(2023, 1, 7, 15)
    )
    lc8 = LiveChat(
        sender_to_channel = users[4],
        channel = channels[3],
        # message=fake.text(max_nb_chars=randint(300, 499)),
        message = "We will pray for you!",
        created_at = datetime(2023, 1, 8, 15)
    )
    lc9 = LiveChat(
        sender_to_channel = users[4],
        channel = channels[4],
        # message=fake.text(max_nb_chars=randint(300, 499)),
        message = "The best part of waking up is...",
        created_at = datetime(2023, 1, 9, 15)
    )
    lc10 = LiveChat(
        sender_to_channel = users[5],
        channel = channels[4],
        # message=fake.text(max_nb_chars=randint(300, 499)),
        message = "espresso in your cup!",
        created_at = datetime(2023, 1, 10, 15)
    )
    lc11 = LiveChat(
        sender_to_channel = users[5],
        channel = channels[5],
        # message=fake.text(max_nb_chars=randint(300, 499)),
        message = "Former tea drinker here, what do you guys recommend?",
        created_at = datetime(2023, 1, 11, 15)
    )
    lc12 = LiveChat(
        sender_to_channel = users[6],
        channel = channels[5],
        # message=fake.text(max_nb_chars=randint(300, 499)),
        message = "Literally anything, you have no where to go but up!",
        created_at = datetime(2023, 1, 12, 15)
    )
    lc13 = LiveChat(
        sender_to_channel = users[6],
        channel = channels[6],
        message=fake.text(max_nb_chars=randint(300, 499)),
        created_at = datetime(2023, 1, 13, 15)
    )
    lc14 = LiveChat(
        sender_to_channel = users[7],
        channel = channels[6],
        message=fake.text(max_nb_chars=randint(300, 499)),
        created_at = datetime(2023, 1, 14, 15)
    )
    lc15 = LiveChat(
        sender_to_channel = users[7],
        channel = channels[7],
        message=fake.text(max_nb_chars=randint(300, 499)),
        created_at = datetime(2023, 1, 15, 15)
    )
    lc16 = LiveChat(
        sender_to_channel = users[8],
        channel = channels[7],
        message=fake.text(max_nb_chars=randint(300, 499)),
        created_at = datetime(2023, 1, 16, 15)
    )
    lc17 = LiveChat(
        sender_to_channel = users[8],
        channel = channels[8],
        message=fake.text(max_nb_chars=randint(300, 499)),
        created_at = datetime(2023, 1, 17, 15)
    )
    lc18 = LiveChat(
        sender_to_channel = users[9],
        channel = channels[8],
        message=fake.text(max_nb_chars=randint(300, 499)),
        created_at = datetime(2023, 1, 18, 15)
    )
    lc19 = LiveChat(
        sender_to_channel = users[7],
        channel = channels[9],
        message=fake.text(max_nb_chars=randint(300, 499)),
        created_at = datetime(2023, 1, 19, 15)
    )
    lc20 = LiveChat(
        sender_to_channel = users[8],
        channel = channels[9],
        message=fake.text(max_nb_chars=randint(300, 499)),
        created_at = datetime(2023, 1, 20, 15)
    )
    lc21 = LiveChat(
        sender_to_channel = users[7],
        channel = channels[10],
        message=fake.text(max_nb_chars=randint(300, 499)),
        created_at = datetime(2023, 1, 21, 15)
    )
    lc22 = LiveChat(
        sender_to_channel = users[5],
        channel = channels[10],
        message=fake.text(max_nb_chars=randint(300, 499)),
        created_at = datetime(2023, 1, 22, 15)
    )
    lc23 = LiveChat(
        sender_to_channel = users[6],
        channel = channels[11],
        message=fake.text(max_nb_chars=randint(300, 499)),
        created_at = datetime(2023, 1, 23, 15)
    )
    lc24 = LiveChat(
        sender_to_channel = users[6],
        channel = channels[11],
        message=fake.text(max_nb_chars=randint(300, 499)),
        created_at = datetime(2023, 1, 24, 15)
    )
    lc25 = LiveChat(
        sender_to_channel = users[6],
        channel = channels[12],
        message=fake.text(max_nb_chars=randint(300, 499)),
        created_at = datetime(2023, 1, 25, 15)
    )
    lc26 = LiveChat(
        sender_to_channel = users[7],
        channel = channels[12],
        message=fake.text(max_nb_chars=randint(300, 499)),
        created_at = datetime(2023, 1, 26, 15)
    )
    lc27 = LiveChat(
        sender_to_channel = users[7],
        channel = channels[13],
        message=fake.text(max_nb_chars=randint(300, 499)),
        created_at = datetime(2023, 1, 27, 15)
    )
    lc28 = LiveChat(
        sender_to_channel = users[8],
        channel = channels[13],
        message=fake.text(max_nb_chars=randint(300, 499)),
        created_at = datetime(2023, 1, 28, 15)
    )
    lc29 = LiveChat(
        sender_to_channel = users[8],
        channel = channels[14],
        message=fake.text(max_nb_chars=randint(300, 499)),
        created_at = datetime(2023, 1, 28, 16)
    )
    lc30 = LiveChat(
        sender_to_channel = users[9],
        channel = channels[14],
        message=fake.text(max_nb_chars=randint(300, 499)),
        created_at = datetime(2023, 1, 28, 17)
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
