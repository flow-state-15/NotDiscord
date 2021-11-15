from werkzeug.security import generate_password_hash
from app.models import db, User, Server, User_Server, Channel, Message, Friend
import datetime as dt
from random import randint, choice, sample
from faker import Faker
import json

fake = Faker()

# loads json data
with open('app/seeds/message_data.json') as json_file:
    data = json.load(json_file)
messages = data['messages']
replacements = data['replacements']
# default counts
total_users = 30
total_servers = 31
channels_per_server = 7
total_channels = total_servers*channels_per_server


def seed_user():
    '''
    Seeds the user table.
    '''
    # admin setup
    admin_user = User(
        email='admin@admin.com',
        hashed_password=generate_password_hash('tasty'),
        avatar='https://i1.sndcdn.com/artworks-000102510409-ifa0zk-t500x500.jpg',
        tagged_name=f'Admin#4321',
        created_at=dt.datetime.now(),
    )
    db.session.add(admin_user)
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
    # TODO add more avatars
    avatars = [
        'https://raw.githubusercontent.com/flow-state-15/discord_clone_2/master/react-app/public/assets/discord-icons/blue-discord-icon.png',
        'https://raw.githubusercontent.com/flow-state-15/discord_clone_2/master/react-app/public/assets/discord-icons/gray-discord-icon.png',
        'https://raw.githubusercontent.com/flow-state-15/discord_clone_2/master/react-app/public/assets/discord-icons/green-discord-icon.png',
        'https://raw.githubusercontent.com/flow-state-15/discord_clone_2/master/react-app/public/assets/discord-icons/orange-discord-icon.png',
        'https://raw.githubusercontent.com/flow-state-15/discord_clone_2/master/react-app/public/assets/discord-icons/red-discord-icon.png',
        'https://raw.githubusercontent.com/flow-state-15/discord_clone_2/master/react-app/public/assets/discord-icons/yellow-discord-icon.png'
    ]
    for _ in range(0, total_users+1):
        # get random avatar
        avatar = choice(avatars)
        user = User(
            email=fake.email(),
            hashed_password=generate_password_hash('password'),
            avatar=avatar,
            tagged_name=f'{fake.user_name()}#{randint(1000, 10000)}',
            created_at=dt.datetime.now(),
        )
        db.session.add(user)
    db.session.commit()


def seed_server():
    '''
    Seeds the server table.
    '''
    # demo server
    demo_server = Server(
        name='The DemoDome',
        owner_id=2,
        icon='https://i1.sndcdn.com/artworks-000102510409-ifa0zk-t500x500.jpg',
        invite_link=generate_password_hash(f'The DemoDome{randint(1, 20)}')[-8:]
    )
    db.session.add(demo_server)
    server_adjectives = [
        'Awesome Server',
        'Hangout',
        'Chill Zone',
        'Server',
        'Party House',
        'Respite'
    ]
    server_icons = [
        'https://cdn.discordapp.com/icons/172069829690261504/31089b57cbcdc00edb0798e31fc60bb2.png?size=96',
        'https://cdn.discordapp.com/icons/755931313256792156/a_19c9e024fa406601d2c44a028c6fc343.png?size=96',
        'https://cdn.discordapp.com/icons/729943368364326952/52aa622504f824963bb07c5318da22dd.png?size=96',
        'https://cdn.discordapp.com/icons/210521487378087947/a_77ab3bf5031c3b245233893c4260aac2.png?size=96',
        'https://cdn.discordapp.com/icons/640318729174908931/f06f8be1c0f1a6e5386e0bb3155efc27.png?size=96',
        'https://cdn.discordapp.com/icons/857387890316542014/e7d12477031549c309e46162e919d6ab.png?size=96',
        'https://cdn.discordapp.com/icons/861593221385945098/033e02bac10d3308b9fbd37bbe35fdd8.png?size=96',
        'https://cdn.discordapp.com/icons/851233159312048178/500c3086fb4827a3c2057f65c544627c.png?size=96',
        'https://cdn.discordapp.com/icons/850448061951901696/064262859e69d1142b650bbf6a52c8a9.png?size=96',
        'https://cdn.discordapp.com/icons/816356438032908328/a0b0fa82d9658c6fbc1274e85bff420d.png?size=96',
        'https://cdn.discordapp.com/icons/698301276164718762/f80e5c3787bdb7fd9abf43149e3f7fb0.png?size=96',
        'https://cdn.discordapp.com/icons/844479840015089714/48a717534ee5362ce7c820eaf7431a6e.png?size=96',
        'https://cdn.discordapp.com/icons/781310352037642280/ee55be0f0c763a2ec391ab7d1c0906aa.png?size=96',
        'https://cdn.discordapp.com/icons/804452491147870248/f70787aef85321bff562d1e297076a8f.png?size=96',
        'https://cdn.discordapp.com/icons/870927080613904416/34dcd9cdfdb8d4db695e533fb8480faa.png?size=96',
        'https://cdn.discordapp.com/icons/434487340535382016/cc6d45988d6b5fb039fdb34bb1e844ca.png?size=96',
        'https://cdn.discordapp.com/icons/720365448809545742/bc84ee31daddd111d4c2cfe205e992a7.png?size=96',
        'https://cdn.discordapp.com/icons/855633663425118228/257f109083f788f13d4eac4731dc804d.png?size=96',
        'https://cdn.discordapp.com/icons/846787546116653067/33391751cec8c9c34c7b478cd24e43e3.png?size=96'
    ]
    for _ in range(0, 30):
        user = fake.user_name()
        server_name = f'{user}\'s {server_adjectives[randint(0, len(server_adjectives)-1)]}'
        # default icon to a blank string in case one is not given
        new_icon = ''
        # 30% chance of no avatar given to make it more realistic
        icon_chance = randint(1, 101)
        if len(server_icons) > 0 and icon_chance > 30:
            new_icon = server_icons.pop()
        new_server = Server(
            name=server_name,
            owner_id=randint(1, total_users+1),
            icon=new_icon,
            invite_link=generate_password_hash(f'{server_name}{randint(1, 21)}')[-8:]
        )
        db.session.add(new_server)
    db.session.commit()


def seed_user_server():
    '''
    Seeds the user_server table.
    '''
    # sets the first server to be owned by demo user
    new_user_server = User_Server(
        server_id=1,
        user_id=2
    )
    db.session.add(new_user_server)
    for server in range(1, total_servers+1):
        users = []
        for _ in range(1, 15):
            user = randint(2, total_users)
            while user in users:
                user = randint(2, total_users)
            new_user_server = User_Server(
                server_id=server,
                user_id=user
            )
            db.session.add(new_user_server)
            users.append(user)
        print('server list', server, users)
    db.session.commit()


def pair_generator(numbers):
  '''
  Return an iterator of random pairs from a list of numbers.
  '''
  # Keep track of already generated pairs
  used_pairs = set()
  while True:
    pair = sample(numbers, 2)
    # Avoid generating both (1, 2) and (2, 1)
    pair = tuple(sorted(pair))
    if pair not in used_pairs:
      used_pairs.add(pair)
      yield pair


def seed_friends():
    '''
    Seeds the friends table.
    '''
    # A relatively long list
    numbers = list(range(2, total_users-1))
    gen = pair_generator(numbers)
    for _ in range(2, total_users-1):
        pair = next(gen)
        new_user_server = Friend(
            sender_user_id=pair[0],
            rec_user_id=pair[1],
            accepted=True
        )
        db.session.add(new_user_server)
    db.session.commit()


def seed_channel():
    '''
    Seeds the channel table.
    '''
    # demo channels
    demo_channels = [
        'general-chat',
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
        'music',
        'movies',
        'spoilers',
        'tv-shows',
        'politics',
        'exercise',
        'programming',
        'pet-photos',
        'video-games',
    ]
    # gives channels only to servers with an id above 1 so demo server is untouched
    for i in range(2, total_servers+1):
        current_channels = []
        if i%2==0:
            main_channel = 'general-chat'
        else:
            main_channel = 'lounge'
        new_channel = Channel(
            name=main_channel,
            server_id=i
        )
        db.session.add(new_channel)
        for _ in range(1, channels_per_server+1):
            while True:
                channel_name = random_channel_names[randint(1, len(random_channel_names)-1)]
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
    '''
    Seeds messages using json data designed to created realistic back and forth messages between users.
    '''
    # TODO use dict or something to be sure repeated messages are not in the same channel
    message_date = dt.datetime.now() - dt.timedelta(days=365*5)
    for _ in range(1, (5*total_channels+1)):
        channel_id = randint(1, total_channels+1)
        channel_name = Channel.query.get(channel_id).name
        channel_key = channel_name
        user_1 = randint(1, total_users+1)
        user_2 = user_1
        while user_1 == user_2:
            user_2 = randint(2, total_users+1)
        if channel_name == 'lounge':
            channel_key = 'general-chat'
        current_user = randint(2, total_users+1)
        num = 2
        delta = dt.timedelta(
            days=randint(1,3),
            minutes=randint(6, 59),
            hours=randint(1, 6),
            seconds=randint(1, 59)
        )
        message_date = message_date + delta
        for message in choice(messages[channel_key]):
            if isinstance(message, list):
                message = choice(message)
            if '{' in message:
                for key, value in replacements.items():
                    key = '{' + key + '}'
                    if key in message:
                        message = message.replace(key, choice(value))
            if num%2 == 0:
                current_user = user_1
            else:
                current_user = user_2
            new_message = Message(
                user_id=current_user,
                channel_id=channel_id,
                content=message,
                sent_date=message_date
            )
            num += 1
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
    db.session.execute(f'TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.execute(f'TRUNCATE friends RESTART IDENTITY CASCADE;')
    db.session.execute(f'TRUNCATE user_servers RESTART IDENTITY CASCADE;')
    db.session.execute(f'TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.execute(f'TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.execute(f'TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()


if __name__ == '__main__':
    seed_message()
