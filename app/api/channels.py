from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Channel, User, User_Channel


channel_routes = Blueprint("channels", __name__)


#CHANNEL routes
#get one channel
@channel_routes.route('/<int:channel_id>')
@login_required
def get_channel(channel_id):
    return "get one channel"


#get channel members
@channel_routes.route('/members/<int:channel_id>')
@login_required
def get_channel_members(channel_id):
    members = User.query.join(User_Channel).filter(User_Channel.channel_id == channel_id).all()
    print("\n\n\n ***** get CHANNEL members route", members, "\n\n\n")
    return {"members": [member.to_dict() for member in members]}


#get all channels by user
@channel_routes.route('/byUser/<int:channel_id>')
@login_required
def get_channels_byuser(channel_id):
    return "get user channels"


#get all channels by server
@channel_routes.route('/byServer/<int:server_id>')
@login_required
def get_channels_byserver(server_id):
    channels = Channel.query.filter(Channel.server_id == server_id).all()
    return {"channels": [channel.to_dict() for channel in channels]}


#POST create channel
@channel_routes.route('/', methods=['POST'])
@login_required
def create_channel():
    data = request.json
    channel = Channel(
        name=data["name"],
        server_id=data["server_id"]
    )
    db.session.add(channel)
    db.session.commit()
    return channel.to_dict()


#PUT update channel
@channel_routes.route('update/<int:channel_id>', methods=['PUT'])
@login_required
def update_channel(channel_id):
    channel = Channel.query.get(channel_id)
    data = request.json
    channel.name = data["name"]
    db.session.commit()
    return channel.to_dict()


#DELETE delete channel
@channel_routes.route('delete/<int:channel_id>', methods=['DELETE'])
@login_required
def delete_channel(channel_id):
    db.session.query(Channel).filter(Channel.id==channel_id).delete()
    db.session.commit()
    return {'server_id': channel_id}
