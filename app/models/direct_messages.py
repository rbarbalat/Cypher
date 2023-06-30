from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class DirectMessage(db.Model):
  __tablename__ = 'direct_messages'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  recipient_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  message = db.Column(db.String(2000), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now())

  #sender = db.relationship("User", foreign_keys=[sender_id], back_populates="recipient_dms")
  #recipient = db.relationship("User", foreign_keys=[recipient_id], back_populates="sender_dms")

  # billing_address = relationship("Address", foreign_keys="[Customer.billing_address_id]")
  # billing_address = relationship("Address", foreign_keys="Customer.billing_address_id")
