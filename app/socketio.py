from flask_socketio import SocketIO
import os


if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://actual-app-url.herokuapp.com",
        "https://actual-app-url.herokuapp.com"
    ]
else:
    origins = "*"


# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)
