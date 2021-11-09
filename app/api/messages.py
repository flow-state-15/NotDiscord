from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Message, User, Channel
import datetime as dt
from sqlalchemy import select


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
    # messages = Message.query.filter(Message.channel_id == channel_id).all()
    # messages = Message.query.outerjoin(User.avatar).filter(Message.channel_id == channel_id).all()

    messages = db.session.query(Message, User).where(Message.user_id == User.id).filter(Message.channel_id == channel_id).all()

    # test = [message, user for message in messages]

    test = []
    for message, user in messages:
        obj = message.to_dict()
        obj["user"] = user.to_dict()
        test.append(obj)

    print(f"\n\n\n{test}\n\n\n")


    return {"messages": [message for message in test]}


#POST create message
@message_routes.route('/test', methods=['POST'])
@login_required
def create_message():
    data = request.json
    message = Message(
        user_id=data["user_id"],
        channel_id=data["channel_id"],
        content=data["content"],
        sent_date=dt.datetime.now()
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
