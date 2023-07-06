from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class LiveChat(db.Model):
  __tablename__ = 'live_chats'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("channels.id")), nullable=False)
  message = db.Column(db.String(2000), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now())

  #original signle association (originally no association between live replies and users)
  replies = db.relationship("LiveReplies", back_populates="chat", cascade="all, delete-orphan")

  channel = db.relationship("Channel", back_populates="live_chat_users")
  sender_to_channel = db.relationship("User", back_populates="channel_chats")

  def to_dict_no_assoc(self):
    return {
      "id": self.id,
      "message": self.message,
      "created_at": self.created_at,
      "sender_id": self.sender_id
    }
