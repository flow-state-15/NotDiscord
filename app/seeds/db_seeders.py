from werkzeug.security import generate_password_hash
from app.models import db, User, Server, User_Server, Channel, Message, Friend
import datetime as dt
import random
from faker import Faker

fake = Faker()

total_users = 30
total_servers = 20


def seed_user():
    # demo user
    demo_user = User(
        email='DougD@demo.dome',
        hashed_password=generate_password_hash('DemoDome'),
        avatar='https://i1.sndcdn.com/artworks-000102510409-ifa0zk-t500x500.jpg',
        tagged_name=f'Doug_DemoDome#1234',
        created_at=dt.datetime.now(),
    )
    db.session.add(demo_user)
    # rest of the users
    for _ in range(0, total_users+1):
        user = User(
            email=fake.email(),
            hashed_password=generate_password_hash('password'),
            # avatar=fake.avatar(),
            avatar="",
            tagged_name=f'{fake.user_name()}#{random.randint(1000, 10000)}',
            created_at=dt.datetime.now(),
        )
        db.session.add(user)
    db.session.commit()


def seed_server():
    # demo server
    demo_server = Server(
        name='The DemoDome',
        owner_id=1,
        icon='https://i1.sndcdn.com/artworks-000102510409-ifa0zk-t500x500.jpg',
        invite_link=generate_password_hash('The DemoDome')[-8:]
    )
    db.session.add(demo_server)
    server_adjectives = [
        'Awesome Server',
        'Hangout',
        'Awesome Server',
    ]
    for _ in range(0, 30):
        user = fake.user_name()
        server_name = f'{user}\'s {server_adjectives[random.randint(0, len(server_adjectives)-1)]}'
        new_server = Server(
            name=server_name,
            owner_id=random.randint(1, total_users+1),
            # icon=fake.avatar(),
            icon="",
            invite_link=generate_password_hash(server_name)[-8:]
        )
        db.session.add(new_server)
    db.session.commit()


def seed_user_server():
    for server in range(1, total_servers+1):
        users = []
        for _ in range(1, 11):
            while True:
                user = random.randint(1, total_users)
                if user not in users:
                    new_user_server = User_Server(
                        server_id=server,
                        user_id=user
                    )
                    db.session.add(new_user_server)
                    users.append(user)
                    break
    db.session.commit()


def seed_friends():
    for i in range(1, total_users-1):
        new_user_server = Friend(
            sender_user_id=i,
            rec_user_id=i+1
        )
        db.session.add(new_user_server)
    db.session.commit()


def seed_channel():
    # demo channels
    demo_channels = [
        'General Chat',
        'business',
        'movies',
        'music',
        'tv-shows',
        'demo-dome-praise-room'
    ]
    for channel in demo_channels:
        demo_channel = Channel(
            name=channel,
            server_id=1
        )
        db.session.add(demo_channel)
    # other channel creation
    random_channel_names = [
        'art',
        'memes',
        'anime',
        'movies',
        'music',
        'spoilers',
        'tv-shows',
        'politics'
        'pc-gaming',
        'exercise',
        'programming',
        'pet-photos',
        'cute-animals',
        'video-games',
        'console-gaming',
    ]
    for i in range(1, total_servers+1):
        current_channels = []
        if i%2==0:
            main_channel = 'General Chat'
        else:
            main_channel = 'Lounge'
        new_channel = Channel(
            name=main_channel,
            server_id=i
        )
        db.session.add(new_channel)
        for _ in range(1, 7):
            while True:
                channel_name = random_channel_names[random.randint(1, len(random_channel_names)-1)]
                if channel_name not in current_channels:
                    current_channels.append(channel_name)
                    new_channel = Channel(
                        name=channel_name,
                        server_id=i
                    )
                    break
            db.session.add(new_channel)
    db.session.commit()


def seed_message():
    for i in range(0, 120):
        new_message = Message(
            user_id=random.randint(1, total_users+1),
            channel_id=random.randint(1, total_users+1),
            content=f'This is a test message {i}.',
            sent_date=dt.datetime.now()
        )
        db.session.add(new_message)
    db.session.commit()


def seed_all():
    '''
    Seeds all models.
    '''
    seed_user()
    seed_server()
    seed_user_server()
    seed_channel()
    seed_message()
    seed_friends()


def undo_all():
    '''
    Undos all seeded models.
    '''
    models = [
        Message, Friend, User_Server, Channel, Server, User
    ]
    for model in models:
        db.session.execute(f'TRUNCATE {model} RESTART IDENTITY CASCADE;')
    db.session.commit()


if __name__ == '__main__':
    seed_all()
    # undo_all()
