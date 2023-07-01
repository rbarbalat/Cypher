from flask import Blueprint, jsonify
from app.models import Team, TeamMembership, User
from flask_login import current_user

team_routes = Blueprint('teams', __name__)

# @team_routes.route('/')
# def get_teams():
#   teams = Team.query.all()
#   return teams

# @team_routes.route('/user/<int:id>')
# @current_user
# def get_user_teams(id):
#   if current_user:
#     teams = [team_mem.team for team_mem in current_user.teams]
#     teams = [{
#       'id':team.id,
#       'name':team.name,
#       'image':team.image
#       } for team in teams]
#     return teams
