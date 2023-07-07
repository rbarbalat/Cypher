from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username='Demo', email='demo@aa.io', password='password', image='https://xsgames.co/randomusers/assets/avatars/male/43.jpg')
    jonathan = User(username='jonathan', email='jonathan@aa.io',password='password', image='https://xsgames.co/randomusers/assets/avatars/male/74.jpg')
    omar = User(username='omar', email='omar@aa.io', password='password', image='https://xsgames.co/randomusers/assets/avatars/male/52.jpg')
    chris = User(username='chris', email='chris@aa.io', password='password', image='https://xsgames.co/randomusers/assets/avatars/male/8.jpg')
    roman = User(username='roman', email='roman@aa.io', password='password', image='https://xsgames.co/randomusers/assets/avatars/male/32.jpg')
    sara = User(username='sara', email='sara@aa.io', password='password', image='https://xsgames.co/randomusers/assets/avatars/female/76.jpg')
    lisa = User(username='lisa', email='lisa@aa.io',password='password', image='https://xsgames.co/randomusers/assets/avatars/female/46.jpg')
    helen = User(username='helen', email='helen@aa.io', password='password', image='https://xsgames.co/randomusers/assets/avatars/female/32.jpg')
    anna = User(username='anna', email='anna@aa.io', password='password', image='https://xsgames.co/randomusers/assets/avatars/female/8.jpg')
    megan = User(username='megan', email='megan@aa.io', password='password', image='https://xsgames.co/randomusers/assets/avatars/female/71.jpg')


    db.session.add(demo)
    db.session.add(jonathan)
    db.session.add(omar)
    db.session.add(chris)
    db.session.add(roman)
    db.session.add(sara)
    db.session.add(lisa)
    db.session.add(helen)
    db.session.add(anna)
    db.session.add(megan)
    db.session.commit()
    return [demo, jonathan, omar, chris, roman, sara, lisa, helen, anna, megan]


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
