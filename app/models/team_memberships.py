from .db import db, environment, SCHEMA
from enum import Enum

class TeamMembership(db.Model):
    __tablename__ = "team_memberships"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), cascade='all, delete-orphan', nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey("teams.id"), cascade='all, delete-orphan', nullable=False)
    status = db.Column(db.Enum('owner', 'admin', 'member', name='team_enum'), nullable=False, default='member')

    #a user instance corresponding to a teamMembershp instance
    user = db.relationship("User", back_populates="teams")
    #a team instance corresponding to a teamMembership instance
    team = db.relationship("Team", back_populates="users")
