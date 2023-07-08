from app.models import db, DirectMessage, environment, SCHEMA
# from app.models import db, direct_messages, environment, SCHEMA
from sqlalchemy.sql import text
from random import sample, randint
from faker import Faker

fake = Faker()

def seed_direct_messages(users):
    for i in range(0, 25):
        pair = sample(users, 2)
        dm = DirectMessage(
            sender=pair[0],
            recipient=pair[1],
            message=fake.text(max_nb_chars=randint(300, 499))
        )
        db.session.add(dm)
    db.session.commit()



def undo_direct_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.direct_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM direct_messages"))

    db.session.commit()
