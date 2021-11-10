from flask import Blueprint, request
from flask_login import login_required
from app.models import db, User, Friend


friend_routes = Blueprint("friends", __name__)


#CHANNEL routes
#get one channel
@friend_routes.route('/<int:channel_id>')
@login_required
def get_channel(channel_id):
    # TODO finish get one channel route
    return "get one channel"


#get user friends
@friend_routes.route('/<int:user_id>')
@login_required
def get_friends(user_id):
    # friends = User.query.join(Friend).filter(Friend.sender_user_id == user_id and Friend.accepted == True).all()
    print("\n\n\n ***** get user FRIENDS route\n\n\n")

    friends = db.session.query(User).join(Friend).where(Friend.sender_user_id == user_id and Friend.accepted == True).all()

    return {"friends": [friend.to_dict() for friend in friends]}


# #get all channels by user
# @friend_routes.route('/byUser/<int:user_id>')
# @login_required
# def get_channels_byuser(user_id):
#     # TODO finish get all channels by user route
#     channels = Channel.query.filter(Channel.user_id == user_id).all()
#     users = User.query.all()

#     messagedict = [message.to_dict() for message in channels]
#     userdict = [user.to_dict() for user in users]

#     for obj in messagedict:
#         current_obj_user = next((user for user in userdict if user["id"] == obj["user_id"]), False)
#         obj['user'] = current_obj_user

#     return {"messages": messagedict}


# #get all channels by server
# @friend_routes.route('/byServer/<int:server_id>')
# @login_required
# def get_channels_byserver(server_id):
#     channels = Channel.query.filter(Channel.server_id == server_id).all()
#     return {"channels": [channel.to_dict() for channel in channels]}


# #POST create channel
# @friend_routes.route('/', methods=['POST'])
# @login_required
# def create_channel():
#     data = request.json
#     channel = Channel(
#         name=data["name"],
#         server_id=data["server_id"]
#     )
#     db.session.add(channel)
#     db.session.commit()
#     return channel.to_dict()


# #DELETE delete channel
# @friend_routes.route('delete/<int:channel_id>', methods=['DELETE'])
# @login_required
# def delete_channel(channel_id):
#     db.session.query(Channel).filter(Channel.id==channel_id).delete()
#     db.session.commit()
#     return {'server_id': channel_id}
