from flask_socketio import SocketIO, emit, join_room, leave_room, send
import os


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://aa-concord.herokuapp.com/',
        'https://aa-concord.herokuapp.com/'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)

# handle room-chat messages
@socketio.on("message")
def handle_chat(data):
    send({'id': data['id'], 'content': data['content'], "user": data['user'], 'sent_date': data['sent_date']}, room=data['room'])

# handle join chat
@socketio.on('join')
def join(data):
    join_room(data['room'])

# handle leave char
@socketio.on("leave")
def leave(data):
    leave_room(data['room'])
