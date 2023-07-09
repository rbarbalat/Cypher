from .db import db, environment, SCHEMA

class Team(db.Model):
  __tablename__ = 'teams'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False, index=True, unique=True)
  description = db.Column(db.String(2000))
  image = db.Column(db.String)
  channels = db.relationship('Channel', back_populates="team", cascade='all, delete-orphan')
  users = db.relationship("TeamMembership", back_populates="team", cascade='all, delete-orphan')

  def to_dict_no_assoc(self):
    return {
      "id": self.id,
      "name": self.name,
      'description': self.description
    }
