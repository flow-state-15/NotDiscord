from flask import Blueprint, render_template
from flask_login import login_required


bp = Blueprint("servers", __name__, url_prefix="/servers")


# SERVER ROUTES
#get one specific server
@bp.route('/<int:server_id>')
def get_one_server(server_id):
    return "<h1>Testing backend</h1>"


# get all user servers
@bp.route('/byUser/<int:user_id>')
def logged_in_start(user_id):
    return "<h1>User logged in</h1>"


# POST create server
@bp.route('/', methods=['POST'])
def get_all_servers():
    return "<h1>create server</h1>"


# PUT create server
@bp.route('/<int:server_id>', methods=['PUT'])
def update_server(server_id):
    return "<h1>update server</h1>"


# DELETE server
@bp.route('/<int:server_id>', methods=['DELETE'])
def delete_server(server_id):
    return "<h1>delete server</h1>"
