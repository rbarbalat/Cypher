from app.models import db, Team, environment, SCHEMA
from sqlalchemy.sql import text

def seed_teams():
    t1 = Team(
        name="The Waffle Wizards",
        description="The Waffle Wizards: Flipping pancakes, casting delicious spells, and spreading syrupy joy one breakfast at a time!",
        image="https://unsplash.com/photos/vWjvnhkjziI"
    )
    t2 = Team(
        name="The Caffeine Crew",
        description="The Caffeine Crew: Fueling productivity, one cup of coffee at a time. We're a highly caffeinated bunch on a mission to conquer mornings and tackle deadlines with a jolt of energy!",
        image="https://unsplash.com/photos/LMzwJDu6hTE"
    )
    t3 = Team(
        name="The Giggle Squad",
        description="The Giggle Squad: Spreading laughter, one witty remark at a time. We're experts in comedy, with a knack for turning frowns upside down!",
        image="https://unsplash.com/photos/s1ihVBg5tbI"
    )
    t4 = Team(
        name="The Awkward Turtles",
        description="The Awkward Turtles: Embracing awkwardness with grace and humor. We're masters of social clumsiness, turning those cringe-worthy moments into memorable anecdotes!",
        image="https://unsplash.com/photos/N5ByCirHVqw"
    )
    t5 = Team(
        name="The Emoji Enthusiasts",
        description="The Emoji Enthusiasts: Expressing ourselves in tiny digital pictograms. We speak fluent emoji and believe in the power of these little icons to convey our thoughts and emotions!",
        image="https://unsplash.com/photos/zDDdoYqQ64U"
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
