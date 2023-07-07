from flask.cli import AppGroup
from .users import seed_users, undo_users
from .channels import seed_channels, undo_channels
from .teams import seed_teams, undo_teams
from .team_memberships import seed_team_memberships, undo_team_memberships
from .channel_memberships import seed_channel_memberships, undo_channel_memberships
from .live_chats import seed_live_chats, undo_live_chats
from .direct_messages import seed_direct_messages, undo_direct_messages
from .live_replies import seed_live_replies, undo_live_replies

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_live_replies()
        undo_direct_messages()
        undo_live_chats()
        undo_channel_memberships()
        undo_team_memberships()
        undo_channels()
        undo_teams()
        undo_users()
    print('start seed')
    users = seed_users()
    print('seed users')
    teams = seed_teams()
    print('seed teams')
    channels = seed_channels(teams)
    print('seed channels')
    seed_team_memberships(users, teams)
    seed_channel_memberships(users, channels)
    live_chats = seed_live_chats(users, channels)
    seed_direct_messages(users)
    seed_live_replies(users, live_chats)
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_live_replies()
    undo_direct_messages()
    undo_live_chats()
    undo_channel_memberships()
    undo_team_memberships()
    undo_channels()
    undo_teams()
    undo_users()
    # Add other undo functions here
