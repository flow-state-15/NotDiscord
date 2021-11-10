from flask import Blueprint, request
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

    the_message = message.to_dict()
    the_users = User.query.get(data["user_id"])
    # userdict = [user.to_dict() for user in the_users]
    # current_obj_user = next((user for user in userdict if user["id"] == the_message["user_id"]), False)

    # the_message["user"] = current_obj_user
    the_message["user"] = the_users.to_dict()
    # normalized = db.session.query(Message, User).where(Message.user_id == data["user_id"])
    # test = None
    # for message, user in normalized:
    #     obj = message.to_dict()
    #     obj["user"] = user.to_dict()
    #     test = {**obj}

    print(f"\n\n\n{the_message}\n\n\n")


    return the_message


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
    db.session.query(Message).filter(Message.id==message_id).delete()
    db.session.commit()
    return {'message_id': message_id}
