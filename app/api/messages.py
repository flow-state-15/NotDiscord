from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, Message
from app.forms import MessageForm


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
@message_routes.route('/', methods=['POST'])
@login_required
def create_message():
    form = MessageForm()
    if form.validate_on_submit():
        data = form.data
        print('\n\n\nMessage Data', data, '\n\n\n')
        message = Message(
            user_id=data.user_id,
            channel_id=data.channel_id,
            conent=data.content,
            sent_date=data.sent_date
        )
        db.session.add(message)
        db.session.commit()
        return message.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


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
