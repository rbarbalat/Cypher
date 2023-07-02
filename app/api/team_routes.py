from flask import Blueprint, jsonify, request
from app.models import Team, TeamMembership, User, db, Channel, ChannelMembership
from flask_login import current_user
from app.forms import team_form
from app.forms.channel_form import ChannelForm
from sqlalchemy import or_

team_routes = Blueprint("teams", __name__)

#GET ALL TEAMS
@team_routes.route("/")
def get_teams():
  if not current_user.is_authenticated:
    return {"error" : "go get logged in"}
  teams = Team.query.all()
  if len(teams) == 0:
    return []
  return [{"id": team.id, "name": team.name, "image": team.image} for team in teams]

#GET TEAMS BY ID
@team_routes.route("/<int:id>")
def get_team_by_id(id):
  if not current_user.is_authenticated:
    return {"error" : "go get logged in"}
  team = Team.query.get(id)
  if team is None:
    return {"error": "Team not found"}
  return {"id": team.id, "name": team.name, "image": team.image, "description":team.description}

#GET CURRENT USER'S TEAMS
@team_routes.route("/currentuser")
def get_user_teams():
  if not current_user.is_authenticated:
    return {"error" : "go get logged in"}
  team_list=[]
  for membership in current_user.teams:
    team_list.append(membership.team)
  team_list = [{
    "id": team.id,
    "name": team.name,
    "image": team.image
    } for team in team_list]
  return team_list

#GET CHANNELS BY TEAM ID
@team_routes.route("/<int:id>/channels")
def get_team_channels(id):
  if not current_user.is_authenticated:
    return {"error" : "go get logged in"}
  channel_list=[]
  team = Team.query.get(id)
  if team is None:
    return {"error": "Team not found"}
  for channel in team.channels:
    channel_list.append(channel)
  channel_list = [{
    "id": channel.id,
    "name": channel.name,
    "private": channel.private
    } for channel in channel_list]
  return channel_list

#GET ALL MEMBERS OF A TEAM
@team_routes.route('/<int:id>/members')
def get_members_for_team(id):
  if not current_user.is_authenticated:
    return {"error" : "go get logged in"}

  #DO WE NEED TO PREVENT NON TEAM MEMBERS FROM HAVING ACCESS??
  team = Team.query.get(id)
  #DO WE NEED TO ADD USER'S EMAIL?
  users = [{
    "id":membership.user.id,
    "username":membership.user.username
      } for membership in team.users]
  return users

#CREATE A TEAM
@team_routes.route('/', methods=['POST'])
def create_team():
  if not current_user.is_authenticated:
    return {"error" : "go get logged in"}
  #weird syntax was jonathan testing something
  form = team_form.TeamForm()
  form["csrf_token"].data = request.cookies["csrf_token"]
  if form.validate_on_submit():
    team = Team()
    form.populate_obj(team)
    db.session.add(team)
    db.session.add(TeamMembership(user=current_user, team=team, status="owner"))
    db.session.commit()
    return {
      "id":team.id,
      "name":team.name,
      "description":team.description,
      "image":team.image
    }
  return {"errors": form.errors}

#DELETE A TEAM
@team_routes.route('/<int:id>', methods=['POST'])
def delete_team(id):
  if not current_user.is_authenticated:
    return {"error" : "go get logged in"}
  team = Team.query.get(id)
  if not team:
    return {"error": "Team does not exist"}
  for team_membership in current_user.teams:
    if team_membership.team_id == team.id:
      if team_membership.status == "owner":
          db.session.delete(team)
          db.session.commit()
          return {"message" : "team deleted :)"}
      else:
        return {"error" : "not authorized"}
  return {"error" : "not authorized"}


#CREATE A CHANNEL FOR A TEAM (ID)
@team_routes.route('/<int:id>/channels', methods=['POST'])
def create_channel(id):
  if not current_user.is_authenticated:
    return {"error" : "go get logged in"}
  form = ChannelForm()
  form["csrf_token"].data = request.cookies["csrf_token"]
  #DO WE WANT ONLY TEAM OWNNERS/ADMIN TO BE ABLE TO CREATE CHANNELS FOR A TEAM?
  isOwnerOrAdmin = TeamMembership.query.filter(TeamMembership.user_id == current_user.id).filter(or_(TeamMembership.status == "admin", TeamMembership.status == "owner")).filter(TeamMembership.team_id == id).first()
  if not isOwnerOrAdmin:
      return {"error" : "not authorized"}
  if form.validate_on_submit():
    channel = Channel()
    form.populate_obj(channel)
    #id from the route parameter
    channel.team_id = id
    db.session.add(channel)
    db.session.add(ChannelMembership(user=current_user, channel=channel, status="owner"))
    db.session.commit()
    return {
      "id":channel.id,
      "name":channel.name,
      "description":channel.description,
      "private":channel.private,
      "team_id":channel.team_id
    }
  return {"errors": form.errors}

#ADD A MEMBER TO A TEAM (USER ADDS HIMSELF)
@team_routes.route('/<int:id>/members', methods=['POST'])
def add_member_to_team(id):
  if not current_user.is_authenticated:
    return {"error" : "go get logged in"}
  team = Team.query.get(id)
  if team is None:
    return {"error": "team does not exist"}
  if len(team.users) == 0:
    return {"error": "can't add yourself to a team with zero members"}
  isAlreadyMember = current_user.id in [tm.user_id for tm in team.users]
  #replaced with cleaner code
  #isAlreadyMember = TeamMembership.query.filter(TeamMembership.user_id == current_user.id).filter(TeamMembership.team_id == id).first()
  if isAlreadyMember:
    return {"error" : "you've already joined"}
  tm = TeamMembership(
    user = current_user,
    team = team,
    status = "member"
  )
  db.session.add(tm)
  db.session.commit()
  return {"message":"added"}
