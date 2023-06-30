from app.models import db, Team, environment, SCHEMA
from sqlalchemy.sql import text

def seed_teams():
    t1 = Team(
        name="Team 1",
        description="Lorem ipsum color dit senum.",
        image="https://urltoimage.png"
    )
    t2 = Team(
        name="Team 2",
        description="Lorem ipsum color dit senum.",
        image="https://urltoimage.png"
    )


    db.session.add(t1)
    db.session.add(t2)

    db.session.commit()
    return [t1, t2]



def undo_teams():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.teams RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM teams"))

    db.session.commit()
