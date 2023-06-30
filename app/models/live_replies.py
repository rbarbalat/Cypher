from .db import db, environment, SCHEMA
from datetime import datetime

class LiveReplies(db.Model):
  __tablename__ = 'live_replies'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), cascade='all, delete-orphan', nullable=False)
  live_chat_id = db.Column(db.Integer, db.ForeignKey("live_chats.id"), cascade='all, delete-orphan', nullable=False)
  message = db.Column(db.String(2000), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now())
