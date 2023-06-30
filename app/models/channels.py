from .db import db, environment, SCHEMA

class Channel(db.Model):
  __tablename__ = 'channels'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False, index=True)
  description = db.Column(db.String(2000))
  private = db.Column(db.Boolean(), nullable=False, default=False)
  team_id = db.Column(db.Integer(), db.ForeignKey('teams.id'), nullable=False, cascade='all, delete-orphan')
  