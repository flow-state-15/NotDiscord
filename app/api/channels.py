from flask import Blueprint, render_template
from flask_login import login_required


bp = Blueprint("channels", __name__, url_prefix="/channels")


#CHANNEL routes
#get one channel
@bp.route('/<int:channel_id>')
def get_channel(channel_id):
    return "get one channel"


#get all channels by user
@bp.route('/byUser/<int:channel_id>')
def get_channels_byuser(channel_id):
    return "get user channels"


#get all channels by server
@bp.route('/byServer/<int:server_id>')
def get_channels_byserver(server_id):
    return "get server channels"


#POST create channel
@bp.route('/', methods=['POST'])
def create_channel():
    return "create channel"


#PUT update channel
@bp.route('/<int:channel_id>', methods=['PUT'])
def update_channel(channel_id):
    return "update channel"


#DELETE delete channel
@bp.route('/<int:channel_id>', methods=['DELETE'])
def delete_channel(channel_id):
    return "delete channel"
