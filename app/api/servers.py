from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Server, User_Server, User, Channel, User_Channel, Message
from werkzeug.security import generate_password_hash
from random import randint


server_routes = Blueprint("servers", __name__)


# SERVER ROUTES
#get all servers
@server_routes.route('/')
@login_required
def get_all_servers():
    servers = Server.query.all()
    return {"servers": [server.to_dict() for server in servers]}


#get one specific server
@server_routes.route('/<int:server_id>')
@login_required
def get_one_server(server_id):
    server = Server.query.filter(Server.id == server_id).one()
    return {"server": server.to_dict()}


#get server by invite link
@server_routes.route('/invite/<server_invite_link>')
@login_required
def get_server_by_invite(server_invite_link):
    server = Server.query.filter(Server.invite_link == server_invite_link).one()
    if server:
        return {"server": server.to_dict()}


#get server members
@server_routes.route('/members/<int:server_id>')
@login_required
def get_server_members(server_id):
    members = User.query.join(User_Server).filter(User_Server.server_id == server_id).all()
    return {"members": [member.to_dict() for member in members]}


# get all user servers
@server_routes.route('/byUser/<int:user_id>')
@login_required
def logged_in_start(user_id):
    server_list = Server.query.join(User_Server).filter(User_Server.user_id == user_id).all()
    return {"servers": [server.to_dict() for server in server_list]}


# POST create server
@server_routes.route('/', methods=['POST'])
@login_required
def post_all_servers():
    data = request.json
    if 'icon' in data.keys():
        icon = data["icon"]
    else:
        icon = ''
    server = Server(
        name=data["name"],
        owner_id=data["owner_id"],
        icon=icon,
        invite_link=generate_password_hash(f'{data["name"]}{randint(1, 21)}')[-8:]
    )
    db.session.add(server)
    db.session.commit()
    default_channel = Channel(
        name="general",
        server_id=server.id
    )
    db.session.add(default_channel)
    db.session.commit()
    new_user_server = User_Server(
        server_id=server.id,
        user_id=data["owner_id"]
    )
    db.session.add(new_user_server)
    db.session.commit()
    result_server = server.to_dict()
    result_server["firstChannelId"] = default_channel.id
    return result_server


# PUT update server
@server_routes.route('/<int:server_id>', methods=['PUT'])
@login_required
def update_server(server_id):
    server = Server.query.get(server_id)
    data = request.json
    if 'icon' in data.keys():
        server.icon = data["icon"]
    if 'name' in data.keys():
        server.name = data["name"]
    db.session.commit()
    return server.to_dict()


# DELETE server
@server_routes.route('/<int:server_id>', methods=['DELETE'])
@login_required
def delete_server(server_id):
    db.session.query(User_Server).filter(User_Server.server_id == server_id).delete()
    db.session.query(Channel).filter(Channel.server_id == server_id).delete()

    db.session.query(Server).filter(Server.id==server_id).delete()
    db.session.commit()
    return {'server_id': server_id}

# POST join server
@server_routes.route('/join', methods=['POST'])
@login_required
def join_a_server():
    data = request.json
    server = User_Server(
        server_id = data["server_id"],
        user_id = data["user_id"],
    )

    db.session.add(server)
    db.session.commit()

    joined_server = Server.query.get(data["server_id"])
    server_dict = joined_server.to_dict()

    first_channel = Channel.query.filter(Channel.server_id == server_dict["id"]).first()
    first_channel_dict = first_channel.to_dict()
    server_dict["firstChannelId"] = first_channel_dict["id"]
    return {'server': server_dict}
