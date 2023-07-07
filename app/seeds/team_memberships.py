from app.models import db, TeamMembership, environment, SCHEMA
from sqlalchemy.sql import text

def seed_team_memberships(users, teams):
    tm1 = TeamMembership(user=users[0], team=teams[0], status='owner')
    tm2 = TeamMembership(user=users[1], team=teams[0])
    tm3 = TeamMembership(user=users[2], team=teams[0])
    tm4 = TeamMembership(user=users[3], team=teams[0])
    tm5 = TeamMembership(user=users[4], team=teams[0])
    tm6 = TeamMembership(user=users[5], team=teams[0])
    tm7 = TeamMembership(user=users[1], team=teams[1], status='owner')
    tm8 = TeamMembership(user=users[2], team=teams[1])
    tm9 = TeamMembership(user=users[3], team=teams[1])
    tm10 = TeamMembership(user=users[4], team=teams[1])
    tm11 = TeamMembership(user=users[5], team=teams[1])
    tm12 = TeamMembership(user=users[6], team=teams[1])
    tm13 = TeamMembership(user=users[2], team=teams[2], status='owner')
    tm14 = TeamMembership(user=users[3], team=teams[2])
    tm15 = TeamMembership(user=users[4], team=teams[2])
    tm16 = TeamMembership(user=users[5], team=teams[2])
    tm17 = TeamMembership(user=users[6], team=teams[2])
    tm18 = TeamMembership(user=users[7], team=teams[2])
    tm19 = TeamMembership(user=users[3], team=teams[3], status='owner')
    tm20 = TeamMembership(user=users[4], team=teams[3])
    tm21 = TeamMembership(user=users[5], team=teams[3])
    tm22 = TeamMembership(user=users[6], team=teams[3])
    tm23 = TeamMembership(user=users[7], team=teams[3])
    tm24 = TeamMembership(user=users[8], team=teams[3])
    tm25 = TeamMembership(user=users[4], team=teams[4], status='owner')
    tm26 = TeamMembership(user=users[5], team=teams[4])
    tm27 = TeamMembership(user=users[6], team=teams[4])
    tm28 = TeamMembership(user=users[7], team=teams[4])
    tm29 = TeamMembership(user=users[8], team=teams[4])
    tm30 = TeamMembership(user=users[9], team=teams[4])


    tm_list = [tm1, tm2, tm3, tm4, tm5, tm6, tm7, tm8, tm9, tm10, tm11, tm12, tm13, tm14, tm15, tm16, tm17, tm18, tm19, tm20, tm21, tm22, tm23, tm24, tm25, tm26, tm27, tm28, tm29, tm30]
    for tm in tm_list:
        db.session.add(tm)
    db.session.commit()


def undo_team_memberships():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.team_memberships RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM team_memberships"))

    db.session.commit()
