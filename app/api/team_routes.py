from flask import Blueprint, jsonify
from app.models import Team, TeamMembership, User
from flask_login import current_user

team_routes = Blueprint("teams", __name__)


@team_routes.route("/")
def get_teams():
    teams = Team.query.all()
    print(teams)
    if len(teams) == 0:
        return {}
    return [{"id": team.id, "name": team.name, "image": team.image} for team in teams]


@team_routes.route("/<int:id>")
def get_team_by_id(id):
    team = Team.query.get(id)
    if team is None:
        return {"message": "Team not found"}
    return {"id": team.id, "name": team.name, "image": team.image}


@team_routes.route("/user/<int:id>")
def get_user_teams(id):

    # team_membership = TeamMembership.query.get.filter(current_user.id = team_membership.user)
    # teams = [team_mem.team for team_mem in current_user.teams]
    # teams = [{
    #   'id':team.id,
    #   'name':team.name,
    #   'image':team.image
    #   } for team in teams]
    # return teams
    return "hello"
