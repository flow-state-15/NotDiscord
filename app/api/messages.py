from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Message, User, User_Channel
import datetime as dt



message_routes = Blueprint("messages", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


#MESSAGES routes
#GET all messages in channel
@message_routes.route('/byChannel/<int:channel_id>')
@login_required
def get_channel_messages(channel_id):
    messages = Message.query.filter(Message.channel_id == channel_id).all()
    users = User.query.all()

    messagedict = [message.to_dict() for message in messages]
    userdict = [user.to_dict() for user in users]

    for obj in messagedict:
        current_obj_user = next((user for user in userdict if user["id"] == obj["user_id"]), False)
        obj['user'] = current_obj_user

    return {"messages": messagedict}


#POST create message
@message_routes.route('/test', methods=['POST'])
@login_required
def create_message():
    data = request.json
    message = Message(
        user_id=data["user_id"],
        channel_id=data["channel_id"],
        content=data["content"],
        sent_date=dt.datetime.now().strftime('%x %X')
    )
    db.session.add(message)
    db.session.commit()
    return message.to_dict()


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
