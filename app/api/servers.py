from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Server, User_Server


server_routes = Blueprint("servers", __name__)


# SERVER ROUTES
#get one specific server
@server_routes.route('/<int:server_id>')
@login_required
def get_one_server(server_id):
    return "<h1>Testing backend</h1>"


# get all user servers
@server_routes.route('/byUser/<int:user_id>')
@login_required
def logged_in_start(user_id):
    servers = User_Server.query.filter(User_Server.user_id == user_id).all()
    return {'servers': [server.to_dict() for server in servers]}

# POST create server
@server_routes.route('/', methods=['POST'])
@login_required
def get_all_servers():
    return "<h1>create server</h1>"


# PUT create server
@server_routes.route('/<int:server_id>', methods=['PUT'])
@login_required
def update_server(server_id):
    return "<h1>update server</h1>"


# DELETE server
@server_routes.route('/<int:server_id>', methods=['DELETE'])
@login_required
def delete_server(server_id):
    return "<h1>delete server</h1>"
