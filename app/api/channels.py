from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Channel, User_Channel


channel_routes = Blueprint("channels", __name__)


#CHANNEL routes
#get one channel
@channel_routes.route('/<int:channel_id>')
@login_required
def get_channel(channel_id):
    return "get one channel"


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
    return "create channel"


#PUT update channel
@channel_routes.route('/<int:channel_id>', methods=['PUT'])
@login_required
def update_channel(channel_id):
    return "update channel"


#DELETE delete channel
@channel_routes.route('/<int:channel_id>', methods=['DELETE'])
@login_required
def delete_channel(channel_id):
    return "delete channel"
