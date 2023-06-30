from .db import db, environment, SCHEMA

class Team(db.Model):
  __tablename__ = 'teams'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False, index=True)
  description = db.Column(db.String(2000))
  image = db.Column(db.String)
