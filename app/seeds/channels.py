from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice

def seed_channels(teams):
    c1 = Channel(
        name="Channel 1",
        description="Lorem ipsum color dit senum.",
        private=True,
        team=teams[0]
    )
    c2 = Channel(
        name="Channel 2",
        description="Lorem ipsum color dit senum.",
        private=True,
        team=teams[0]
    )
    c3 = Channel(
        name="Channel 3",
        description="Lorem ipsum color dit senum.",
        private=True,
        team=teams[0]
    )
    c4 = Channel(
        name="Channel 4",
        description="Lorem ipsum color dit senum.",
        private=True,
        team=teams[0]
    )
    c5 = Channel(
        name="Channel 5",
        description="Lorem ipsum color dit senum.",
        private=True,
        team=teams[0]
    )
    c6 = Channel(
        name="Channel 6",
        description="Lorem ipsum color dit senum.",
        team=teams[1]
    )
    c7 = Channel(
        name="Channel 7",
        description="Lorem ipsum color dit senum.",
        team=teams[1]
    )
    c8 = Channel(
        name="Channel 8",
        description="Lorem ipsum color dit senum.",
        team=teams[1]
    )
    c9 = Channel(
        name="Channel 9",
        description="Lorem ipsum color dit senum.",
        team=teams[1]
    )
    c10 = Channel(
        name="Channel 10",
        description="Lorem ipsum color dit senum.",
        team=teams[1]
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
    db.session.commit()
    return [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10]


def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
