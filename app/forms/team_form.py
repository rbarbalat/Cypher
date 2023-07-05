from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from wtforms.validators import URL, DataRequired, ValidationError, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws import ALLOWED_EXTENSIONS


class TeamForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired(), Length(max=2000)] )
    image = FileField("image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    # image = URLField("image")
