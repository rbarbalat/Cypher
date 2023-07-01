from app.models import db, ChannelMembership, environment, SCHEMA
from sqlalchemy.sql import text

def seed_channel_memberships(users, channels):
    cm1 = ChannelMembership(user=users[0], channel=channels[0], status='owner')
    cm1 = ChannelMembership(user=users[4], channel=channels[5], status='owner')
    cm2 = ChannelMembership(user=users[1], channel=channels[1], status='admin')
    cm3 = ChannelMembership(user=users[2], channel=channels[2], status="admin")
    cm4 = ChannelMembership(user=users[3], channel=channels[3])
    cm5 = ChannelMembership(user=users[4], channel=channels[4])
    cm6 = ChannelMembership(user=users[0], channel=channels[5])
    cm7 = ChannelMembership(user=users[1], channel=channels[6])
    cm8 = ChannelMembership(user=users[2], channel=channels[7])
    cm9 = ChannelMembership(user=users[3], channel=channels[8])
    cm10 = ChannelMembership(user=users[4], channel=channels[9])

    cm_list = [cm1, cm2, cm3, cm4, cm5, cm6, cm7, cm8, cm9, cm10]
    for cm in cm_list:
        db.session.add(cm)
    db.session.commit()


def undo_channel_memberships():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channel_memberships RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channel_memberships"))

    db.session.commit()
