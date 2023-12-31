# from .db import db, environment, SCHEMA, add_prefix_for_prod
from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from ..models.direct_messages import DirectMessage

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True, index=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    image = db.Column(db.String(255))

    # channels is a list of channelMembership instances for a fixed user
    channels = db.relationship("ChannelMembership", back_populates="user", cascade='all, delete-orphan')
    # teams is a list of teamMemberships instances for a fixed user
    teams = db.relationship("TeamMembership", back_populates="user", cascade='all, delete-orphan')


    channel_chats = db.relationship("LiveChat", back_populates="sender_to_channel", cascade='all, delete-orphan')

    #new association
    channel_replies = db.relationship("LiveReplies", back_populates="sender_of_reply", cascade="all, delete-orphan")

    sent_messages = db.relationship('DirectMessage', foreign_keys='DirectMessage.sender_id', back_populates='sender', cascade='all, delete-orphan')
    received_messages = db.relationship('DirectMessage', foreign_keys='DirectMessage.recipient_id', back_populates='recipient', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'image': self.image if self.image else None
        }
