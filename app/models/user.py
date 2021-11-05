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
            'username': self.username,
            'email': self.email
        }


class User_Server(db.Model):
    __tablename__ = 'user_servers'
    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey(
        "servers.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }


class Server(db.Model):
    __tablename__ = 'servers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    icon = db.Column(db.String(255))

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }


class Friend(db.Model):
    __tablename__ = 'friends'
    id = db.Column(db.Integer, primary_key=True)
    accepted = db.Column(db.Boolean, default=False, nullable=False)
    sender_user_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    rec_user_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }


class User_Channel(db.Model):
    __tablename__ = 'user_channels'
    id = db.Column(db.Integer, primary_key=True)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        "channels.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }


class Channel(db.Model):
    __tablename__ = 'channels'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    server_id = db.Column(db.Integer, db.ForeignKey("servers.id"))

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }


class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        "channels.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    sent_date = db.Column(db.Date, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
