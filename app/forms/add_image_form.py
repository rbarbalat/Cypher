from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from wtforms.validators import URL, DataRequired, ValidationError, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws import ALLOWED_EXTENSIONS

class UserImageForm(FlaskForm):
    image = FileField("image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
