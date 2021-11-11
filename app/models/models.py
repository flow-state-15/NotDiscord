from sqlalchemy.orm import backref
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


# class User(db.Model, UserMixin):
#     __tablename__ = 'users'

#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(40), nullable=False, unique=True)
#     email = db.Column(db.String(255), nullable=False, unique=True)
#     hashed_password = db.Column(db.String(255), nullable=False)

#     @property
#     def password(self):
#         return self.hashed_password

#     @password.setter
#     def password(self, password):
#         self.hashed_password = generate_password_hash(password)

#     def check_password(self, password):
#         return check_password_hash(self.password, password)

    # def to_dict(self):
    #     return {
    #         'id': self.id,
    #         'username': self.username,
    #         'email': self.email
    #     }




# OUR SHIT
class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    avatar = db.Column(db.String(255))
    tagged_name = db.Column(db.String(255), nullable=False)
    created_at= db.Column(db.Date, nullable=False)
    # messages = db.relationship('Message', backref='user')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'hashed_password': self.hashed_password,
            'avatar': self.avatar,
            'tagged_name': self.tagged_name,
            'created_at': self.created_at
        }


class User_Server(db.Model):
    __tablename__ = 'user_servers'
    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey(
        "servers.id", ondelete='CASCADE'), nullable=False, )
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False, )
    users = db.relationship('User', backref='server')

    def to_dict(self):
        return {
            'id': self.id,
            'server_id': self.server_id,
            'user_id': self.user_id
        }


class Server(db.Model):
    __tablename__ = 'servers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False, )
    icon = db.Column(db.String(255))
    invite_link = db.Column(db.String)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'owner_id': self.owner_id,
            'icon': self.icon,
            'invite_link': self.invite_link,
        }


class Friend(db.Model):
    __tablename__ = 'friends'
    id = db.Column(db.Integer, primary_key=True)
    accepted = db.Column(db.Boolean, default=False, nullable=False)
    sender_user_id = db.Column(
        db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False, )
    rec_user_id = db.Column(
        db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False, )
    # friend = db.relationship()

    def to_dict(self):
        return {
            'id': self.id,
            'accepted': self.accepted,
            'sender_user_id': self.sender_user_id,
            'rec_user_id': self.rec_user_id,
        }


class User_Channel(db.Model):
    __tablename__ = 'user_channels'
    id = db.Column(db.Integer, primary_key=True)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        "channels.id", ondelete='CASCADE'), nullable=False, )
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False, )

    def to_dict(self):
        return {
            'id': self.id,
            'channel_id': self.channel_id,
            'user_id': self.user_id,
        }


class Channel(db.Model):
    __tablename__ = 'channels'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    server_id = db.Column(db.Integer, db.ForeignKey("servers.id", ondelete='CASCADE'), )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'server_id': self.server_id,
        }


class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False, )
    channel_id = db.Column(db.Integer, db.ForeignKey(
        "channels.id", ondelete='CASCADE'), nullable=False, )
    content = db.Column(db.Text, nullable=False)
    sent_date = db.Column(db.DateTime, nullable=False)
    # user = db.relationship('User', backref='messages')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'channel_id': self.channel_id,
            'content': self.content,
            'sent_date': self.sent_date,
        }


class Last_Visited(db.Model):
    __tablename__ = 'last_visited'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'))
    server_id = db.Column(db.Integer, db.ForeignKey("channels.id", ondelete='CASCADE'))
    channel_id = db.Column(db.Integer, db.ForeignKey("servers.id", ondelete='CASCADE'))
    users = db.relationship('User', backref='last_visited', passive_deletes=True)
    channel = db.relationship('Channel', backref='last_visited', passive_deletes=True)
    server = db.relationship('Server', backref='last_visited', passive_deletes=True)
