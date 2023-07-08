from app.models import db, Team, environment, SCHEMA
from sqlalchemy.sql import text

def seed_teams():
    t1 = Team(
        name="The Waffle Wizards",
        description="The Waffle Wizards: Flipping pancakes, casting delicious spells, and spreading syrupy joy one breakfast at a time!",
        image="https://images.unsplash.com/photo-1568051243851-f9b136146e97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
    )
    t2 = Team(
        name="The Caffeine Crew",
        description="The Caffeine Crew: Fueling productivity, one cup of coffee at a time. We're a highly caffeinated bunch on a mission to conquer mornings and tackle deadlines with a jolt of energy!",
        image="https://images.unsplash.com/photo-1606791405792-1004f1718d0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    )
    t3 = Team(
        name="The Giggle Squad",
        description="The Giggle Squad: Spreading laughter, one witty remark at a time. We're experts in comedy, with a knack for turning frowns upside down!",
        image="https://images.unsplash.com/photo-1472746729193-36ad213ac4a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
    )
    t4 = Team(
        name="The Awkward Turtles",
        description="The Awkward Turtles: Embracing awkwardness with grace and humor. We're masters of social clumsiness, turning those cringe-worthy moments into memorable anecdotes!",
        image="https://images.unsplash.com/photo-1572713629470-3e9f5d4fdf4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
    )
    t5 = Team(
        name="The Emoji Enthusiasts",
        description="The Emoji Enthusiasts: Expressing ourselves in tiny digital pictograms. We speak fluent emoji and believe in the power of these little icons to convey our thoughts and emotions!",
        image="https://images.unsplash.com/photo-1565945887714-d5139f4eb0ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    )



    db.session.add(t1)
    db.session.add(t2)
    db.session.add(t3)
    db.session.add(t4)
    db.session.add(t5)

    db.session.commit()
    return [t1, t2, t3, t4, t5]



def undo_teams():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.teams RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM teams"))

    db.session.commit()
