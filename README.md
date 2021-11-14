# Python Discord Clone

Initially, this project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Backend is coded in Python and frontend is coded in JavaScript and CSS, using React/Redux. This project also features Docker implementation.

View our wiki for the project [Wiki](https://github.com/flow-state-15/discord_clone_group_projo/wiki).

## Run App

In the frontend directory, you can run:

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

## Feature List

We are going for an accurate clone of [discord.com](http://discord.com). Our feature list is subject to change but MVP's for this project are:

### User Sign up

- username -- append a random number (#1234)
- Avatars/profile picture

### Create Servers

- server is full CRUD

### Create Channels Within Servers

- Channel is full CRUD

### Server Messaging

- very hopeful to finish via web socket

### Private Messaging

- 2 users
- groups as possible bonus

## BONUS MVP's

### Friends List

### Private Messaging in a group

## How to Use !Discord

### Join Server

ph

### Create Server

Any user can create a new server with the + button at the bottom of their server list.

### Create Channel

If you own the server, you can create a channel with Create Channel button above all current channels list.

### Send Message

Any user can send a message with the message box at the bottom of any channel message list.

### Message Embed

Messages allow many types of embedding when sending links

## ToDo

* invite button from channels if it does not work
* Move gear button to actual gear image
* remove direct message plus icon if it does not work at the top of the dm list
* Add channel appears in all servers instead of just owned servers
