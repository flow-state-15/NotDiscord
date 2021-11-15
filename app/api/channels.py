from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Channel, User, User_Channel, Message


channel_routes = Blueprint("channels", __name__)


#CHANNEL routes
#get one channel
@channel_routes.route('/<int:channel_id>')
@login_required
def get_channel(channel_id):
    # TODO finish get one channel route
    return "get one channel"


#get dm channel by 2 users
@channel_routes.route('/DM/<int:user_id_1>/<int:user_id_2>')
# @login_required
def get_channel_by_users(user_id_1, user_id_2):
    # TODO finish get dm channel by 2 users
    user_1 = User.query.get(user_id_1)
    user_2 = User.query.get(user_id_2)
    DM_name = f"{user_id_1}-{user_1.tagged_name} <-> {user_id_2}-{user_2.tagged_name}"
    DM_channel = Channel.query.filter(Channel.name == DM_name).all()
    if DM_channel == []:
        # create
        channel = Channel(
            name=f"{user_id_1}-{user_1.tagged_name} <-> {user_id_2}-{user_2.tagged_name}"
        )
        db.session.add(channel)
        db.session.commit()

        user_channel_1 = User_Channel(
            channel_id=channel.id,
            user_id=user_id_1
        )
        db.session.add(user_channel_1)
        user_channel_2 = User_Channel(
            channel_id=channel.id,
            user_id=user_id_2
        )
        db.session.add(user_channel_2)
        db.session.commit()
        return channel.to_dict()
    else:
        return DM_channel[0].to_dict()


#get channel members
@channel_routes.route('/members/<int:channel_id>')
@login_required
def get_channel_members(channel_id):
    members = User.query.join(User_Channel).filter(User_Channel.channel_id == channel_id).all()
    return {"members": [member.to_dict() for member in members]}


#get all channels by user
@channel_routes.route('/byUser/<int:user_id>')
@login_required
def get_channels_byuser(user_id):
    # TODO finish get all channels by user route
    # channels = Channel.query.filter(Channel.user_id == user_id).all()
    # users = User.query.all()

    # messagedict = [message.to_dict() for message in channels]
    # userdict = [user.to_dict() for user in users]

    # for obj in messagedict:
    #     current_obj_user = next((user for user in userdict if user["id"] == obj["user_id"]), False)
    #     obj['user'] = current_obj_user

    # return {"messages": messagedict}
    user_channels = []
    user_channel_links = User_Channel.query.filter(User_Channel.user_id == user_id).all()
    for UCL in user_channel_links:
        UCL_obj = UCL.to_dict()
        user_channel = Channel.query.get(UCL_obj["channel_id"])
        user_channels.append(user_channel.to_dict())
    return {"channels": user_channels}



#get all channels by server
@channel_routes.route('/byServer/<int:server_id>')
@login_required
def get_channels_byserver(server_id):
    channels = Channel.query.filter(Channel.server_id == server_id).all()
    return {"channels": [channel.to_dict() for channel in channels]}


#POST create channel
@channel_routes.route('/', methods=['POST'])
@login_required
def create_channel():
    data = request.json
    channel = Channel(
        name=data["name"],
        server_id=data["server_id"]
    )
    db.session.add(channel)
    db.session.commit()
    return channel.to_dict()


#PUT update channel
@channel_routes.route('/<int:channel_id>', methods=['PUT'])
@login_required
def update_channel(channel_id):
    channel = Channel.query.get(channel_id)
    data = request.json
    channel.name = data["name"]
    db.session.commit()
    return channel.to_dict()


#DELETE delete channel
@channel_routes.route('/<int:channel_id>', methods=['DELETE'])
@login_required
def delete_channel(channel_id):
    all_associated_messages = db.session.query(Message).filter(Message.channel_id == channel_id).delete()
    all_associated_user_channels = db.session.query(User_Channel).filter(User_Channel.channel_id == channel_id).delete()

    # for message in all_associated_messages:
    #     message.delete()

    # for channel in all_associated_user_channels:
    #     channel.delete()

    # print(f"\n\n\n{all_associated_messages, all_associated_user_channels}\n\n\n")

    db.session.query(Channel).filter(Channel.id==channel_id).delete()
    db.session.commit()
    return {'server_id': channel_id}
