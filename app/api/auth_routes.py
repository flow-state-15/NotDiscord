from flask import Blueprint, jsonify, session, request
from werkzeug.security import generate_password_hash
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from random import randint, choice
import datetime as dt

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print(f"\n\n\n {form.data} \nERRORS: {form.errors} \n\n\n")
    if form.validate_on_submit():
        avatars = [
            'https://raw.githubusercontent.com/flow-state-15/discord_clone_2/master/react-app/public/assets/discord-icons/blue-discord-icon.png',
            'https://raw.githubusercontent.com/flow-state-15/discord_clone_2/master/react-app/public/assets/discord-icons/gray-discord-icon.png',
            'https://raw.githubusercontent.com/flow-state-15/discord_clone_2/master/react-app/public/assets/discord-icons/green-discord-icon.png',
            'https://raw.githubusercontent.com/flow-state-15/discord_clone_2/master/react-app/public/assets/discord-icons/orange-discord-icon.png',
            'https://raw.githubusercontent.com/flow-state-15/discord_clone_2/master/react-app/public/assets/discord-icons/red-discord-icon.png',
            'https://raw.githubusercontent.com/flow-state-15/discord_clone_2/master/react-app/public/assets/discord-icons/yellow-discord-icon.png'
        ]
        user = User(
            email=form.data['email'],
            hashed_password=generate_password_hash(form.data['password']),
            avatar=choice(avatars),
            tagged_name=form.data['username']+'#'+str(randint(1000, 10000)),
            created_at=dt.datetime.now()
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
