import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import ServerSideBar from "./components/ServerSideBar";
import ServerList from "./components/ServerList";
import DMPage from "./components/DMPage";
import GroupPage from "./components/GroupPage";
import ServerPage from "./components/ServerPage";
import DMGroupPage from "./components/DMGroupPage";
import LoginPage from "./components/LoginPage/LoginPage";
import MyChannelsBar from "./components/MyChannelsBar";
import { authenticate } from "./store/session";
import ServerSideBarNE from "./components/ServerSideNE";
import FriendsSection from "./components/FriendsSection";
import MemberPopoutProvider from "./context/MemberPopout";

import "./reset.css";
import "./App.css";
import DiscordHome from "./components/DiscordHome";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    // <BrowserRouter>
    //   <NavBar />
    //   <Switch>
    //     <Route path='/login' exact={true}>
    //       <LoginForm />
    //     </Route>
    //     <Route path='/sign-up' exact={true}>
    //       <SignUpForm />
    //     </Route>
    //     <ProtectedRoute path='/users' exact={true} >
    //       <UsersList/>
    //     </ProtectedRoute>
    //     <ProtectedRoute path='/users/:userId' exact={true} >
    //       <User />
    //     </ProtectedRoute>
    //     <ProtectedRoute path='/' exact={true} >
    //       <h1>My Home Page</h1>
    //     </ProtectedRoute>
    //   </Switch>
    // </BrowserRouter>
    <div id="app_container">
      <BrowserRouter>
        <MemberPopoutProvider>
          <Switch>
            <Route exact path="/">
              <DiscordHome />
            </Route>
            <Route path="/login" exact={true}>
              <LoginForm />
            </Route>
            <Route path="/sign-up" exact={true}>
              <SignUpForm />
            </Route>
            <ProtectedRoute path="/channels/@me">
              <ServerSideBarNE />
              <MyChannelsBar />
              <FriendsSection />
            </ProtectedRoute>
            <ProtectedRoute path="/servers/">
              <ServerList />
            </ProtectedRoute>
            <ProtectedRoute path="/channels/DM">
              <DMPage />
            </ProtectedRoute>
            <ProtectedRoute path="/channels/group">
              <GroupPage />
            </ProtectedRoute>
            <ProtectedRoute path="/channels/@me/:channelId">
                <DMGroupPage />
            </ProtectedRoute>
            <ProtectedRoute path="/channels/:serverId/:channelId">
              <ServerSideBarNE />
              <ServerPage />
            </ProtectedRoute>
            <ProtectedRoute exact path="/channels/:serverId">
              <ServerSideBarNE />
              <ServerPage />
            </ProtectedRoute>
            <ProtectedRoute path="/test">
              <ServerSideBarNE />
              <MyChannelsBar />
              <FriendsSection />
            </ProtectedRoute>
            <ProtectedRoute path="/invite/:inviteId">
              <ServerSideBarNE />
              <MyChannelsBar />
              <FriendsSection />
            </ProtectedRoute>
          </Switch>
        </MemberPopoutProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
