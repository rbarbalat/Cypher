from app.models import db, TeamMembership, environment, SCHEMA
from sqlalchemy.sql import text

def seed_team_memberships(users, teams):
    print('wertyuiop[]')
    tm1 = TeamMembership(user=users[0], team=teams[0], status='owner')
    tm2 = TeamMembership(user=users[1], team=teams[0], status='admin')
    tm3 = TeamMembership(user=users[2], team=teams[0])
    tm4 = TeamMembership(user=users[3], team=teams[0])
    tm5 = TeamMembership(user=users[4], team=teams[0])
    tm6 = TeamMembership(user=users[4], team=teams[1], status='owner')
    tm7 = TeamMembership(user=users[3], team=teams[1], status='admin')
    tm8 = TeamMembership(user=users[2], team=teams[1])
    tm9 = TeamMembership(user=users[1], team=teams[1])
    tm10 = TeamMembership(user=users[0], team=teams[1])

    tm_list = [tm1, tm2, tm3, tm4, tm5, tm6, tm7, tm8, tm9, tm10]
    db.session.add(tm_list)
    db.session.commit()


def undo_team_memberships():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.team_memberships RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM team_memberships"))

    db.session.commit()
