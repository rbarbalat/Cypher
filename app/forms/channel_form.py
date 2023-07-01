from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SelectField, IntegerField
from wtforms.validators import URL, DataRequired, Email, ValidationError, Length

class ChannelForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired(), Length(max=2000)] )
    private = BooleanField("private", validators=[DataRequired()])
    # team = IntegerField("team_id", validators=[DataRequired()])
    # team = SelectField("team", choices = [], validators = [DataRequired()])
    #need to insert the choices inside the route handler
    #choices is a list of tuples, first element is the db id, second the team name
