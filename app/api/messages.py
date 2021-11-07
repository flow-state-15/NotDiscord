from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Message


message_routes = Blueprint("messages", __name__)


#MESSAGES routes
#GET all messages in channel
@message_routes.route('/byChannel/<int:channel_id>')
@login_required
def get_channel_messages(channel_id):
    return "get all messages in a channel"


#POST create message
@message_routes.route('/', methods=['POST'])
@login_required
def create_message():
    return "create message"


#PUT update message
@message_routes.route('/<int:message_id>', methods=['PUT'])
@login_required
def update_user(message_id):
    return "update user"


#DELETE message
@message_routes.route('/<int:message_id>', methods=['DELETE'])
@login_required
def delete_message(message_id):
    return "delete message"
