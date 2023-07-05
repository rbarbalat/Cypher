from app.models import db, ChannelMembership, environment, SCHEMA
from sqlalchemy.sql import text

def seed_channel_memberships(users, channels):
    cm1 = ChannelMembership(user=users[0], channel=channels[0], status='owner')
    cm2 = ChannelMembership(user=users[1], channel=channels[0])
    cm3 = ChannelMembership(user=users[2], channel=channels[0])
    cm4 = ChannelMembership(user=users[3], channel=channels[0])
    cm5 = ChannelMembership(user=users[4], channel=channels[0])

    cm6 = ChannelMembership(user=users[0], channel=channels[1])
    cm7 = ChannelMembership(user=users[1], channel=channels[1], status='owner')
    cm8 = ChannelMembership(user=users[2], channel=channels[1])

    cm9 = ChannelMembership(user=users[0], channel=channels[2])
    cm10 = ChannelMembership(user=users[3], channel=channels[2])
    cm11 = ChannelMembership(user=users[4], channel=channels[2], status='owner')

    cm12 = ChannelMembership(user=users[0], channel=channels[3])
    cm13 = ChannelMembership(user=users[1], channel=channels[3], status='owner')
    cm14 = ChannelMembership(user=users[2], channel=channels[3])
    cm15 = ChannelMembership(user=users[3], channel=channels[3])
    cm16 = ChannelMembership(user=users[4], channel=channels[3])

    cm17 = ChannelMembership(user=users[1], channel=channels[4])
    cm18 = ChannelMembership(user=users[2], channel=channels[4])
    cm19 = ChannelMembership(user=users[3], channel=channels[4])
    cm20 = ChannelMembership(user=users[4], channel=channels[4], status='owner')

    cm21 = ChannelMembership(user=users[4], channel=channels[5], status='owner')
    cm22 = ChannelMembership(user=users[0], channel=channels[5])

    # cm7 = ChannelMembership(user=users[1], channel=channels[6])
    # cm8 = ChannelMembership(user=users[2], channel=channels[7])
    # cm9 = ChannelMembership(user=users[3], channel=channels[8])
    # cm10 = ChannelMembership(user=users[4], channel=channels[9])

    cm_list = [cm1, cm2, cm3, cm4, cm5, cm6, cm7, cm8, cm9, cm10, cm11, cm12, cm13, cm14, cm15, cm16, cm17, cm18, cm19, cm20, cm21, cm22]
    for cm in cm_list:
        db.session.add(cm)
    db.session.commit()


def undo_channel_memberships():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channel_memberships RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channel_memberships"))

    db.session.commit()
