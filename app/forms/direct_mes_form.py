from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class DirectMessageForm(FlaskForm):
    message = StringField("message", validators=[DataRequired(), Length(max=2000)])

