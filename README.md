# Python Discord Clone

Initially, this project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Backend is coded in Python and frontend is coded in JavaScript and CSS, using React/Redux. This project also features Docker implementation.

View our wiki for the project [Wiki](https://github.com/flow-state-15/discord_clone_group_projo/wiki).

![Splash Page](http://url/to/img.png)

![Main Page](http://url/to/img.png)

![Friends List](http://url/to/img.png)

---

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

---

## Feature List

We are going for an accurate clone of [discord.com](http://discord.com). Our feature list is subject to change but MVP's for this project are:

* User Sign up
    - username -- append a random number (#1234)

* Create Servers
    - server is full CRUD

* Create Channels Within Servers
    - Channel is full CRUD


* Server Messaging
    - very hopeful to finish via web socket

* Private Messaging
    - between 2 users

* Friends List
    - invite to add friends
    - accept invite to add friends
    - view friends list

## How to Use !Discord

<!-- ### Join Server

You can join any server from the discovery page. -->

### Create Server

Any user can create a new server with the + button at the bottom of their server list.

### Create Channel

If you own the server, you can create a channel with the + button to the right of the Text Channel text.

### Send Message

Any user can send a message with the message box at the bottom of any channel message list.

### Message Embed

Messages allow many types of embedding when sending links

---

## To Do

* remove invite button from channels if it does not work
* remove direct message plus icon if it does not work at the top of the dm list
* Add channel appears in all servers instead of just owned servers

---

## Authors and acknowledgment

[Dan Purcell's Github](https://pages.github.com/)

[Jason Zhou's Github](https://github.com/CroissantAhhh)

[Michael Ericson's Github](https://github.com/Concrete18)

[Nebyou Ejigu's Github](https://github.com/nebbb)
