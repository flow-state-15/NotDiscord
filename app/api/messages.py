from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Message
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
    return {"messages": [message.to_dict() for message in messages]}


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
@message_routes.route('update/<int:message_id>', methods=['PUT'])
@login_required
def update_user(message_id):
    message = Message.query.get(message_id)
    data = request.json
    message.content = data["content"]
    db.session.commit()
    return message.to_dict()


#DELETE message
@message_routes.route('delete/<int:message_id>', methods=['DELETE'])
@login_required
def delete_message(message_id):
    db.session.query(Message).filter(Message.id==7).delete()
    db.session.commit()
    return {'message_id': message_id}
