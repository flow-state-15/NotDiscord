from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from faker import Faker

fake = Faker()


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     print(f"\n\n\n {username} \n\n\n")
#     user = User.query.filter(User.tagged_name == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
