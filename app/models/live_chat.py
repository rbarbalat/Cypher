from .db import db, environment, SCHEMA
from datetime import datetime

class LiveChat(db.Model):
  __tablename__ = 'live_chats'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), cascade='all, delete-orphan', nullable=False)
  channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"), cascade='all, delete-orphan', nullable=False)
  message = db.Column(db.String(2000), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now())
