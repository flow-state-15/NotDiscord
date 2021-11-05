from flask import Blueprint, render_template
from flask_login import login_required


bp = Blueprint("messages", __name__, url_prefix="/messages")


#MESSAGES routes
#GET all messages in channel
@bp.route('/byChannel/<int:channel_id>')
def get_channel_messages(channel_id):
    return "get all messages in a channel"


#POST create message
@bp.route('/', methods=['POST'])
def create_message():
    return "create message"


#PUT update message
@bp.route('/<int:message_id>', methods=['PUT'])
def update_user(message_id):
    return "update user"


#DELETE message
@bp.route('/<int:message_id>', methods=['DELETE'])
def delete_message(message_id):
    return "delete message"
