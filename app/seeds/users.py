from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username='Demo', email='demo@aa.io', hashed_password='password')
    jonathan = User(username='jonathan', email='jonathan@aa.io', hashed_password='password')
    omar = User(username='omar', email='omar@aa.io', hashed_password='password')
    chris = User(username='chris', email='chris@aa.io', hashed_password='password')
    roman = User(username='roman', email='roman@aa.io', hashed_password='password')


    db.session.add(demo)
    db.session.add(jonathan)
    db.session.add(omar)
    db.session.add(chris)
    db.session.add(roman)
    db.session.commit()
    return [demo, jonathan, omar, chris, roman]


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
