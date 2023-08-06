from app.models import db, DirectMessage, environment, SCHEMA
# from app.models import db, direct_messages, environment, SCHEMA
from sqlalchemy.sql import text
from random import sample, randint
from faker import Faker
from datetime import datetime

fake = Faker()

def seed_direct_messages(users):
    messages = [
        "When is your next day off?",
        "Can you help me move next weekend?",
        "What are you getting for lunch today?",
        "I just got promoted!",
        "I'm going on vacation to Italy next month!",
        "Read any good books lately?"
        "I'm spending way to much time on youtube lately",
        "I won a ton in Vegas last weekend, already planning my next trip!",
        "These gas prices are killing me!!!",
        "I'm considering a programming bootcamp, any recommendations?",
        "I hit 2 PRs at the gym yesterday!",
        "My car broke down again!  This is ridiculous",
        "I have to get my wisdom teeth removed next weekend",
        "I haven't slept well in weeks, to much noise outside",
        "Can you help me fix this bug? Its driving me crazy",
        "What do you think about going back to school for a Master's?",
        "The DMs on this site work so well!",
        "I love Cypher, never going back to Slack",
        "I'm thinking about moving to Pittsburgh, heard a lot of good things about it",
        "Can you call me after work? I need to talk to you.",
        "Took my kids to the zoo last weekened, they had a great time!",
        "This site is good, thanks for recommending it!",
        "I started drinking enough water each day and I feel so much better",
        "The developers need to add voice channels to this site!",
        "Have a safe flight!"
    ]
    for i in range(0, 25):
        pair = sample(users, 2)
        dm = DirectMessage(
            sender=pair[0],
            recipient=pair[1],
            # message=fake.text(max_nb_chars=randint(300, 499)),
            message = messages[i],
            created_at = datetime(2023, 1, i + 1, 15)
        )
        db.session.add(dm)
    db.session.commit()



def undo_direct_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.direct_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM direct_messages"))

    db.session.commit()
