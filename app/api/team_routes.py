from flask import Blueprint, jsonify, request
from app.models import Team, TeamMembership, User, db, Channel, ChannelMembership
from flask_login import current_user
from app.forms import team_form
from app.forms.channel_form import ChannelForm
from sqlalchemy import or_
from app.api.aws import get_unique_filename, upload_file_to_s3, remove_file_from_s3

team_routes = Blueprint("teams", __name__)

#GET ALL TEAMS
@team_routes.route("/")
def get_teams():
  #commented out b/c sometimes get Teams is called when no user is logged in
  # if not current_user.is_authenticated:
  #   return {"error" : "go get logged in"}
  teams = Team.query.all()
  if len(teams) == 0:
    return []

  list_of_list_of_users = [ [tm.user.to_dict() for tm in team.users] for team in teams ]

  new_teams = [{
    "id": team.id,
    "name": team.name,
    "image": team.image,
    }
    for team in teams]

  for i, user_list in enumerate(list_of_list_of_users, start = 0):
    # print(i)
    new_teams[i]["users"] = user_list
    new_teams[i]["numMembers"] = len(user_list)

  return new_teams

#GET TEAMS BY ID
@team_routes.route("/<int:id>")
def get_team_by_id(id):
  if not current_user.is_authenticated:
    return {"error" : "go get logged in"}
  team = Team.query.get(id)
  if team is None:
    return {"error": "Team not found"}
  users = [{**tm.user.to_dict(), "status": tm.status} for tm in team.users]
  # statuses = [tm.status for tm in team.users]
  # for i in range(len(users)):
  #   users[i]["status"] = statuses[i]
  numMembers = len(users)
  return {"id": team.id, "name": team.name,
           "image": team.image, "description":team.description,
             "users": users, "numMembers": numMembers
             }

#GET CURRENT USER'S TEAMS
@team_routes.route("/currentuser")
def get_user_teams():
  # if not current_user.is_authenticated:
  #   return {"error" : "go get logged in"}
  team_list=[]
  for membership in current_user.teams:
    team_list.append(membership.team)
  list_of_list_of_users = [ [tm.user.to_dict() for tm in team.users] for team in team_list ]

  new_teams = [{
    "id": team.id,
    "name": team.name,
    "image": team.image,
    }
    for team in team_list]

  for i, user_list in enumerate(list_of_list_of_users, start = 0):
    # print(i)
    new_teams[i]["users"] = user_list
    new_teams[i]["numMembers"] = len(user_list)

  return new_teams

#GET CHANNELS BY TEAM ID
@team_routes.route("/<int:id>/channels")
def get_team_channels(id):
  if not current_user.is_authenticated:
    return {"error" : "go get logged in"}
  channel_list=[]
  team = Team.query.get(id)
  if team is None:
    return {"error": "Team not found"}
  user_key_values = []
  for channel in team.channels:
    channel_list.append(channel)
    user_key_values.append([ {**cm.user.to_dict(), "status": cm.status } for cm in channel.users])
  channel_list = [{
    "id": channel.id,
    "name": channel.name,
    "private": channel.private
    } for channel in channel_list ]

  for i in range(len(channel_list)):
    channel_list[i]["users"] = user_key_values[i]
  return channel_list

#get channels of currente user by Team id
@team_routes.route("/<int:id>/channels/user")
def get_team_channel_user(id):
  if not current_user.is_authenticated:
    return {"error" : "go get logged in"}

  team = Team.query.get(id)
  if team is None:
    return {"error": "Team not found"}

  x = set([cm.channel for cm in current_user.channels])
  channel_list = list(set(team.channels).intersection(x))

  user_key_values = []
  for channel in channel_list:
    user_key_values.append([ {**cm.user.to_dict(), "status": cm.status } for cm in channel.users])
  channel_list = [{
    "id": channel.id,
    "name": channel.name,
    "private": channel.private
    } for channel in channel_list ]

  for i in range(len(channel_list)):
    channel_list[i]["users"] = user_key_values[i]
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
    "id":membership.user_id,
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
    image = form.data["image"]
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)
    print("PRINTING UPLOAD PRINTNIG UPLOAD PRINTING UPLOAD")
    print(upload["url"], "this is the upload")
    print("this is the request" , request.data)
    # print("this is the req body ", request.data)
    #upload is a dicitonary with a key of url or a key of errors
    if "url" not in upload:
      return {"error": "failed b/c of problem with the image file"}

    team = Team()
    # form.populate_obj(team)
    team.name = form.data["name"]
    team.description = form.data["description"]
    team.image = upload["url"]

    db.session.add(team)
    db.session.add(TeamMembership(user=current_user, team=team, status="owner"))
    db.session.commit()
    return {
      "id": team.id,
      "name": team.name,
      "description": team.description,
      "image": team.image
    }
  return {"errors": form.errors}

#DELETE A TEAM
@team_routes.route('/<int:id>/delete')
def delete_team(id):
  if not current_user.is_authenticated:
    return {"error" : "go get logged in"}
  team = Team.query.get(id)
  if not team:
    return {"error": "Team does not exist"}

  authorized = current_user.id in [tm.user_id for tm in team.users if tm.status == "owner"]
  if not authorized:
    return {"error": "not authorized"}

  file_delete = remove_file_from_s3(team.image)
  if file_delete is True:
    db.session.delete(team)
    db.session.commit()
    return {"message": "team deleted"}
  else:
    #
    db.session.delete(team)
    db.session.commit()
    return {"message": "team deleted but error on image deletion"}

  # for team_membership in current_user.teams:
  #   if team_membership.team_id == team.id:
  #     if team_membership.status == "owner":
  #         db.session.delete(team)
  #         db.session.commit()
  #         return {"message" : "team deleted :)"}
  #     else:
  #       return {"error" : "not authorized"}
  # return {"error" : "not authorized"}


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
      "team_id":channel.team_id,
      "users": [{**current_user.to_dict(), "status": "owner"}]
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

#DELETE A MEMBER FROM TEAM

@team_routes.route("/<int:team_id>/member/<int:mem_id>")
def delete_member_from_team(team_id, mem_id):

  if not current_user.is_authenticated:
    return {"error" : "go get logged in"}
  print("PRINTING CURRENT USER ----  ", current_user.id)

  #this is the tm to be deleted
  tm = TeamMembership.query.filter(TeamMembership.user_id == mem_id).filter(TeamMembership.team_id == team_id).first()
  if not tm:
     return {"error": "no such user"}

   # the user to be deleted is the owner but it is not the owner trying to delete himself
  if tm.status == "owner" and tm.user_id != current_user.id:
     return {"error": "unauthorized"}

  #owner deletes himself and a new owner is randomly chosen
  if tm.status == "owner" and tm.user_id == current_user.id:
     roll_delete_team_to_channels(team_id, mem_id)
     db.session.delete(tm)
     db.session.commit()
     return {"message": "successfully deleted"}

    #regular user deletes himself
  if tm.user.id == current_user.id:
     roll_delete_team_to_channels(team_id, mem_id)
     db.session.delete(tm)
     db.session.commit()
     return {"message": "successfully deleted"}
  #an owner or admin deletes a user
  elif current_user.id in [ team_mem.user_id for team_mem in
                           TeamMembership.query.filter(TeamMembership.status != "member").filter(TeamMembership.team_id == team_id).all() ]:
    roll_delete_team_to_channels(team_id, mem_id)
    db.session.delete(tm)
    db.session.commit()
    return {"message": "successfully deleted"}

  return {"error": "Unauthorized"}

def roll_delete_team_to_channels(team_id, user_id):
  team = Team.query.get(team_id)
  channels = team.channels
  for channel in channels:
    cm = ChannelMembership.query.filter(ChannelMembership.user_id == user_id).filter(ChannelMembership.channel_id == channel.id).first()
    if cm:
      db.session.delete(cm)
  db.session.commit()




#this is an alternative to  get_team_channel_user specifically
#used by the delete member from channel route
@team_routes.route("/<int:id>/channels/user/<int:user_id>/delete")
def get_team_channel_user_for_delete(id, user_id):

  team = Team.query.get(id)
  if team is None:
    return {"error": "Team not found"}

  user = User.query.get(user_id)
  x = set([cm.channel for cm in user.channels])
  channel_list = list(set(team.channels).intersection(x))

  user_key_values = []
  for channel in channel_list:
    user_key_values.append([ {**cm.user.to_dict(), "status": cm.status } for cm in channel.users])
  channel_list = [{
    "id": channel.id,
    "name": channel.name,
    "private": channel.private
    } for channel in channel_list ]

  for i in range(len(channel_list)):
    channel_list[i]["users"] = user_key_values[i]
  return channel_list
