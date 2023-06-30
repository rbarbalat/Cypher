# from .db import db, environment, SCHEMA, add_prefix_for_prod
from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())

    # channels is a list of channelMembership instances for a fixed user
    channels = db.relationship("ChannelMembership", back_populates="user", cascade='all, delete-orphan')
    teams = db.relationship("TeamMembership", back_populates="user", cascade='all, delete-orphan')
    # recipients is a list of DM instances in which the recipient of that DM is this user instanceS
    recipient_dms = db.relationship("DirectMessage", back_populates="sender", cascade='all, delete-orphan')
    # senders is a list of DM instances in which the sender of that DM is this users instance
    sender_dms = db.relationship("DirectMessage", back_populates="recipient", cascade='all, delete-orphan')
    # lc_senders = db.relationship("Sender", back_populates="lc_channels", cascade='all, delete-orphan')
    live_chat_user = db.relationship("LiveChat", back_populates="sender_to_channel", cascade='all, delete-orphan')


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
            'email': self.email
        }
