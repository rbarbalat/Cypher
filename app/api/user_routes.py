from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User
from app.forms.add_image_form import UserImageForm
from app.api.aws import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from app.models import db

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

@user_routes.route("/image", methods = ["POST"])
def add_image():
    if not current_user.is_authenticated:
        return {"error": "got get logged in"}, 403

    form = UserImageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        #upload is a dicitonary with a key of url or a key of errors
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return {"error": "failed b/c of problem with the image file"}, 400

        print("backend")
        print(upload["url"])
        current_user.image = upload["url"]
        db.session.commit()
        return current_user.to_dict()

    print({"errors": form.errors})
    return {"errors": form.errors}, 400
