from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SelectField, IntegerField
from wtforms.validators import URL, DataRequired, Email, ValidationError, Length
from app.models import Team, Channel

def channel_name_exists(form, field):
    # Checking if channel name is already in use
    name = field.data
    channel = Channel.query.filter(Channel.name == name).first()
    if channel:
        raise ValidationError('Channel name is already in use (possibly in a different team).')

class ChannelForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), channel_name_exists, Length(min = 2, max = 20) ])
    description = StringField("description", validators=[DataRequired(), Length(min = 10, max=1000)] )
    private = BooleanField("private")
