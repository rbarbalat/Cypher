from app.models import db, ChannelMembership, environment, SCHEMA
from sqlalchemy.sql import text

def seed_channel_memberships(users, channels):
    # team 1
    cm1 = ChannelMembership(user=users[0], channel=channels[0], status='owner')
    cm2 = ChannelMembership(user=users[2], channel=channels[0])
    cm3 = ChannelMembership(user=users[5], channel=channels[0])

    cm4 = ChannelMembership(user=users[2], channel=channels[1], status="owner")
    cm5 = ChannelMembership(user=users[5], channel=channels[1])
    cm6 = ChannelMembership(user=users[3], channel=channels[1])

    cm7 = ChannelMembership(user=users[4], channel=channels[2], status="owner")
    cm8 = ChannelMembership(user=users[1], channel=channels[2])
    cm9 = ChannelMembership(user=users[3], channel=channels[2])

    # team 2

    cm10 = ChannelMembership(user=users[2], channel=channels[3], status='owner')
    cm11 = ChannelMembership(user=users[4], channel=channels[3])
    cm12 = ChannelMembership(user=users[3], channel=channels[3])

    cm13 = ChannelMembership(user=users[4], channel=channels[4], status='owner')
    cm14 = ChannelMembership(user=users[1], channel=channels[4])
    cm15 = ChannelMembership(user=users[3], channel=channels[4])

    cm16 = ChannelMembership(user=users[4], channel=channels[5], status='owner')
    cm17 = ChannelMembership(user=users[5], channel=channels[5])
    cm18 = ChannelMembership(user=users[2], channel=channels[5])

    # team 3

    cm19 = ChannelMembership(user=users[6], channel=channels[6], status='owner')
    cm20 = ChannelMembership(user=users[7], channel=channels[6])
    cm21 = ChannelMembership(user=users[3], channel=channels[6])

    cm22 = ChannelMembership(user=users[4], channel=channels[7], status='owner')
    cm23 = ChannelMembership(user=users[5], channel=channels[7])
    cm24 = ChannelMembership(user=users[1], channel=channels[7])

    cm25 = ChannelMembership(user=users[1], channel=channels[8], status='owner')
    cm26 = ChannelMembership(user=users[6], channel=channels[8])
    cm27 = ChannelMembership(user=users[4], channel=channels[8])

    # team 4

    cm28 = ChannelMembership(user=users[4], channel=channels[9], status='owner')
    cm29 = ChannelMembership(user=users[8], channel=channels[9])
    cm30 = ChannelMembership(user=users[5], channel=channels[9])

    cm31 = ChannelMembership(user=users[5], channel=channels[10], status='owner')
    cm32 = ChannelMembership(user=users[3], channel=channels[10])
    cm33 = ChannelMembership(user=users[6], channel=channels[10])

    cm34 = ChannelMembership(user=users[8], channel=channels[11], status='owner')
    cm35 = ChannelMembership(user=users[7], channel=channels[1])
    cm36 = ChannelMembership(user=users[5], channel=channels[11])

    # team 5

    cm37 = ChannelMembership(user=users[9], channel=channels[12], status='owner')
    cm38 = ChannelMembership(user=users[7], channel=channels[12])
    cm39 = ChannelMembership(user=users[4], channel=channels[12])

    cm40 = ChannelMembership(user=users[4], channel=channels[13], status='owner')
    cm41 = ChannelMembership(user=users[5], channel=channels[13])
    cm42 = ChannelMembership(user=users[8], channel=channels[13])

    cm43 = ChannelMembership(user=users[7], channel=channels[14], status='owner')
    cm44 = ChannelMembership(user=users[6], channel=channels[14])
    cm45 = ChannelMembership(user=users[9], channel=channels[14])


    cm_list = [cm1, cm2, cm3, cm4, cm5, cm6, cm7, cm8, cm9, cm10, cm11, cm12, cm13, cm14, cm15, cm16, cm17, cm18, cm19, cm20, cm21, cm22, cm23, cm24, cm25, cm26, cm27, cm28, cm29, cm30, cm31, cm32, cm33, cm34, cm35, cm36, cm37, cm38, cm39, cm40, cm41, cm42, cm43, cm44, cm45]
    for cm in cm_list:
        db.session.add(cm)
    db.session.commit()


def undo_channel_memberships():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channel_memberships RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channel_memberships"))

    db.session.commit()
