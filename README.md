# Twitta - *Clone of Twitter*

Initially, this project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Backend is coded in Python and frontend is coded in JavaScript and CSS, using React/Redux. This project also features Docker implementation.

View our [Live Website Via Heroku](https://aa-not-discord.herokuapp.com/).

View the [Wiki](https://github.com/nebbb/dasecondproject/wiki) for more project info.

![Splash Page](https://i.imgur.com/nM5Z1lE.png)

![Main Page](https://i.imgur.com/pghl4sX.png)

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

Pixel perfect clone of [Twiiter](http://twitter.com).

* User Sign up
    - username

![Signup Example Image](https://i.imgur.com/ZtJytKs.png)

* Tweet
    - Tweets are full CRUD

![Tweet Example](https://i.imgur.com/o0edfjL.png)

* DM Users 
    - Create DMs, and send messages between users!

![User DMs](https://i.imgur.com/tyAgqL9.png)

* Suggested Follows
    - Channels are full CRUD

![Suggested Follows](https://i.imgur.com/tegyWwW.png)



## How to use Twiita

### Tweet

You can make a tweet from any page on the website. 

### Comment

Comment on any public tweet.

### DM Users

If you are following a user, you can create a DM channel with them, this uses WebSockets to enable live chatting between client and server.

### Like and Bookmarks

Tweet interactivity isn't only restricting to comments, you can like and bookmark a tweet aswell!

### Follow Users

You can follow users, check follow count, and see who's following who.

### Reccomended Follows

Aren't sure who to follow? Don't worry. The reccomended follows section will give you suggestions on who to follow based off of who you are already currently following.
