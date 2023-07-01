from flask import Blueprint, request
from app.models import Channel, db, ChannelMembership
from flask_login import current_user
from app.forms.channel_form import ChannelForm
from sqlalchemy import or_

channel_routes = Blueprint('channels', __name__)

@channel_routes.route('/')
def get_channels():
    if not current_user:
        return {"message" : "go get logged in"}
    channels = Channel.query.all()
    print("hello world")
    print(channels)
    if len(channels) == 0:
        return {}
    return [ {
        'id': channel.id,
        'name': channel.name,
        'private': channel.private,
        'team_id': channel.team_id,
        "description": channel.description
        }
        for channel in channels]

@channel_routes.route('/<int:id>')
def get_channel_by_id(id):
    if not current_user:
        return {"message" : "go get logged in"}
    channel = Channel.query.get(id)
    if channel is None:
        return {"message": "Channel not found"}
    return {
        'id': channel.id,
        'name': channel.name,
        'private': channel.private,
        'team_id': channel.team_id,
        "description": channel.description
        }

@channel_routes.route('/<int:id>/members')
def get_members_for_channel(id):
    if not current_user:
        return {"message" : "go get logged in"}
    channel = Channel.query.get(id)
    users = [{
        "id":membership.user.id,
        "username":membership.user.username
              } for membership in channel.users]
    return users


@channel_routes.route('/<int:id>', methods=['POST'])
def delete_channel(id):
    if not current_user:
        return {"message" : "go get logged in"}
    channel = Channel.query.get(id)
    is_authorized = ChannelMembership.query.filter(ChannelMembership.user_id == current_user.id).filter(or_(ChannelMembership.status == "admin", ChannelMembership.status == "owner")).filter(ChannelMembership.channel_id == id).first()
    if not is_authorized:
        return {"message" : "not authorized"}
    db.session.delete(channel)
    db.session.commit()
    return {"message" : "channel deleted :)"}

@channel_routes.route('/<int:id>/members', methods=['POST'])
def add_member_to_channel(id):
    pass
