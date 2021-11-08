
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired



class MessageForm(FlaskForm):


    user_id = IntegerField('user_id', validators=[DataRequired()])
    channel_id = IntegerField('channel_id', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])
    send_date = DateField('send_date', validators=[DataRequired()])
