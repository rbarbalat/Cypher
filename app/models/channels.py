from .db import db, environment, SCHEMA, add_prefix_for_prod

class Channel(db.Model):
  __tablename__ = 'channels'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False, index=True)
  description = db.Column(db.String(2000))
  private = db.Column(db.Boolean(), nullable=False, default=False)
  team_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod('teams.id')), nullable=False)

  #users is a list of channel_membership instances for a fixed channel
  users = db.relationship("ChannelMembership", back_populates="channel", cascade='all, delete-orphan')
  channel_chats = db.relationship("LiveChat", back_populates="channel", cascade='all, delete-orphan')
  team = db.relationship("Team", back_populates="channels")
