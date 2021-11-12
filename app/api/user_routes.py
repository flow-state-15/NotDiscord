from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# PUT update user
@user_routes.route('/<int:user_id>', methods=['PUT'])
@login_required
def update_user(user_id):
    user = User.query.get(user_id)
    data = request.json
    if 'tagged_name' in data.keys():
        user.tagged_name = data["tagged_name"]
    if 'avatar' in data.keys():
        user.avatar = data["avatar"]
    db.session.commit()
    return user.to_dict()

# DELETE user
@user_routes.route('/<int:user_id>', methods=['DELETE'])
@login_required
def delete_user(user_id):
    db.session.query(User).filter(User.id==user_id).delete()
    db.session.commit()
    return {'user_id': user_id}
