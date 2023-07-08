from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from wtforms.validators import URL, DataRequired, ValidationError, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws import ALLOWED_EXTENSIONS
from app.models import Team

def team_name_exists(form, field):
    # Checking if team name is already in use
    name = field.data
    team = Team.query.filter(Team.name == name).first()
    if team:
        raise ValidationError('Team name is already in use.')

class TeamForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), team_name_exists, Length(min=2, max=20)], )
    description = StringField("description", validators=[DataRequired(), Length(min=10, max=1000)] )
    image = FileField("image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
