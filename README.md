# !Discord - *Clone of Discord*

Initially, this project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Backend is coded in Python and frontend is coded in JavaScript and CSS, using React/Redux. This project also features Docker implementation.

View our [Live Website Via Heroku](aa-not-discord.herokuapp.com).

View our [Wiki](https://github.com/flow-state-15/discord_clone_group_projo/wiki) for the project.

![Splash Page](https://raw.githubusercontent.com/flow-state-15/discord_clone_2/master/Screenshots/Splash-Page.png)

![Main Page](https://raw.githubusercontent.com/flow-state-15/discord_clone_2/master/Screenshots/Main-View.png)

---

## Run App

### Frontend Startup

Enter the following into terminal while within react-app dir

```bash
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Backend Startup

Enter following into terminal while within project root

```bash
pipenv run flask run
```
---

## Feature List

We are going for an accurate clone of [Discord](http://discord.com).

* User Sign up
    - username -- append a random number (#1234)

![Signup Example Image](https://github.com/flow-state-15/discord_clone_2/blob/master/Screenshots/Signup.png)

* Create Servers
    - Servers are full CRUD

![Create Servers Example Image](https://github.com/flow-state-15/discord_clone_2/blob/master/Screenshots/Create-Server.png)

* Join Server Discovery 
    - Shows all servers that can be joined

![Join Server Discovery Example Image](https://github.com/flow-state-15/discord_clone_2/blob/master/Screenshots/Discover-Servers.png)

* Create Channels Within Servers
    - Channels are full CRUD

![Create Channels Example Image](https://github.com/flow-state-15/discord_clone_2/blob/master/Screenshots/Create-Channel.png)

* Channel Messaging
    - Server messaging with sockets
    - Multiple format embedding
    
![Embed Example Image](https://raw.githubusercontent.com/flow-state-15/discord_clone_2/master/Screenshots/Embed.png)

* Private Messaging
    - between 2 users

![Private Messaging Example Image](https://github.com/flow-state-15/discord_clone_2/blob/master/Screenshots/Private-Message.png)

* Friends List
    - invite to add friends
    - accept invite to add friends
    - view friends list

![Friends List Example Image](https://github.com/flow-state-15/discord_clone_2/blob/master/Screenshots/Friends-List.png)

## How to Use !Discord

### Join Server

You can join any server from the discovery page.

### Create Server

Any user can create a new server with the + button at the bottom of their server list.

### Create Channel

If you own the server, you can create a channel with the + button to the right of the Text Channel text.

### Send Message

Any user can send a message with the message box at the bottom of any channel message list.

### Message Embed

Messages automatically embed many types of links when sent.

### Add Friends

Click on a user’s avatar so you can see the Add Friend button.
They will be given the choice to accept from their friends list.

---

## Authors and acknowledgment

[Dan Purcell's Github](https://github.com/flow-state-15)

[Jason Zhou's Github](https://github.com/CroissantAhhh)

[Michael Ericson's Github](https://github.com/Concrete18)

[Nebyou Ejigu's Github](https://github.com/nebbb)
