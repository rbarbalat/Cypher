from .db import db, environment, SCHEMA, add_prefix_for_prod
from enum import Enum

class ChannelMembership(db.Model):
    __tablename__ = "channel_memberships"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("channels.id")), nullable=False)
    status = db.Column(db.Enum('owner', 'admin', 'member', name='channel_enum'), nullable=False, default='member')

    #a user instance corresponding to a channelMembershp instance
    user = db.relationship("User", back_populates="channels")
    #a channel instance corresponding to a channelMembership instance
    channel = db.relationship("Channel", back_populates="users")
