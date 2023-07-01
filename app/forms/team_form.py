from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from wtforms.validators import URL, DataRequired, ValidationError, Length

class TeamForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired(), Length(max=2000)] )
    image = URLField("image", validators=[URL()])
    # image = URLField("image")
