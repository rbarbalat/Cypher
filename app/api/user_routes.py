from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route("/all")
def all_users():
    if not current_user.is_authenticated:
        return {"error": "got get logged in"}, 403
    #better structure for us, other route in auth might be used
    #with that structure elsewhere
    users = User.query.all()
    return [user.to_dict() for user in users]
