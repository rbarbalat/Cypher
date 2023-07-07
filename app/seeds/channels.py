from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice

def seed_channels(teams):
    c1 = Channel(
        name="waffle-magic",
        description="Where the Waffle Wizards work their magical creations, experimenting with unique flavors, toppings, and techniques to create waffle masterpieces.",
        private=False,
        team=teams[0]
    )
    c2 = Channel(
        name="syrupy-delights",
        description="A channel dedicated to the art of creating deliciously sweet waffles, exploring various syrups, sauces, and sweet toppings to add a delightful touch to our creations.",
        private=False,
        team=teams[0]
    )
    c3 = Channel(
        name="crispy-concoctions",
        description="Join this channel to discuss and discover the secrets behind achieving the perfect level of crispiness in waffles. Share your tips, tricks, and recipes for achieving that delightful crunch.",
        private=True,
        team=teams[0]
    )
    c4 = Channel(
        name="java-junkies",
        description="Calling all coffee addicts! Join this channel to connect with fellow caffeine enthusiasts, share funny coffee memes, and indulge in light-hearted banter about our shared love for java.",
        private=False,
        team=teams[1]
    )
    c5 = Channel(
        name="espresso-enthusiasts",
        description="For those who appreciate the refined taste of espresso, this channel is the perfect spot to discuss the nuances of different espresso blends, extraction methods, and share your favorite espresso recipes.",
        private=False,
        team=teams[1]
    )
    c6 = Channel(
        name="coffee-chat",
        description="A place to discuss all things coffee-related, share your favorite brews, and exchange tips and tricks for the perfect cup of joe.",
        private=True,
        team=teams[1]
    )
    c7 = Channel(
        name="joke-central",
        description="Welcome to Joke Central! The Giggle Squad team will have you in stitches with our best jokes, puns, and clever humor. Join in and share your own comedic genius!",
        private=False,
        team=teams[2]
    )
    c8 = Channel(
        name="laughter-lounge",
        description="Step into the laughter lounge, where the Giggle Squad team gathers to unwind and share amusing anecdotes, witty one-liners, and anything that will make us chuckle.",
        private=False,
        team=teams[2]
    )
    c9 = Channel(
        name="giggles-general",
        description="A place for all things giggles and good times! Share funny stories, jokes, and hilarious memes with the Giggle Squad team here.",
        private=True,
        team=teams[2]
    )
    c10 = Channel(
        name="turtle-talk",
        description="Dive into lively discussions about various topics, share ideas, and exchange thoughts within the Awkward Turtles team.",
        private=False,
        team=teams[3]
    )
    c11 = Channel(
        name="shy-shells",
        description="A safe haven for the introverted members of the Awkward Turtles team to express themselves and engage in more relaxed conversations.",
        private=False,
        team=teams[3]
    )
    c12 = Channel(
        name="awkward-moments",
        description="Share and laugh about those funny and awkward moments we all experience, creating a sense of camaraderie within the Awkward Turtles team.",
        private=True,
        team=teams[3]
    )
    c13 = Channel(
        name="emoji-inspiration",
        description="Discover and share inspiring and innovative uses of emojis that spark creativity and imagination.",
        private=False,
        team=teams[4]
    )
    c14 = Channel(
        name="emoji-expressions",
        description="Dive into the world of emojis and explore the myriad of emotions they can express.",
        private=False,
        team=teams[4]
    )
    c15 = Channel(
        name="emoji-fun",
        description="A place to share and enjoy the fun and playful side of emojis.",
        private=True,
        team=teams[4]
    )


    db.session.add(c1)
    db.session.add(c2)
    db.session.add(c3)
    db.session.add(c4)
    db.session.add(c5)
    db.session.add(c6)
    db.session.add(c7)
    db.session.add(c8)
    db.session.add(c9)
    db.session.add(c10)
    db.session.add(c11)
    db.session.add(c12)
    db.session.add(c13)
    db.session.add(c14)
    db.session.add(c15)
    db.session.commit()
    return [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15]


def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
