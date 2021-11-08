from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Last_Visited


history_routes = Blueprint("history", __name__)


#MESSAGES routes
#GET ONE user/server history
@history_routes.route('/byUserServer/<int:user_id>/<int:server_id>')
@login_required
def get_history_user_server(user_id, server_id):
    history_row = Last_Visited.query.filter(Last_Visited.user_id == user_id).filter(Last_Visited.server_id == server_id).first()
    return {"server_history": history_row.to_dict()}


#GET ONE user/channel history where server is null, for DM's
@history_routes.route('/byUserChannel/<int:user_id>/<int:channel_id>')
@login_required
def get_history_user_channel(user_id, channel_id):
    history_row = Last_Visited.query.filter(Last_Visited.user_id == user_id).filter(Last_Visited.channel_id == channel_id).first()
    return {"channel_history": history_row.to_dict()}


#POST create history
@history_routes.route('/', methods=['POST'])
@login_required
def create_history():
    # db.session.add(data)
    # db.session.commit()
    return "create message"


#PUT update history
@history_routes.route('/<int:message_id>', methods=['PUT'])
@login_required
def update_history(message_id):
    return "update user"


#DELETE history
@history_routes.route('/<int:message_id>', methods=['DELETE'])
@login_required
def delete_history(message_id):
    return "delete message"
