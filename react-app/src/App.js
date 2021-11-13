import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ServerList from "./components/ServerList";
import ServerPage from "./components/ServerPage";
import DMGroupPage from "./components/DMGroupPage";
import FriendsPage from "./components/FriendsPage";
import MyChannelsBar from "./components/MyChannelsBar";
import { authenticate } from "./store/session";
import ServerSideBarNE from "./components/ServerSideNE";
import FriendsSection from "./components/FriendsSection";
import MemberPopOutProvider from "./context/MemberPopOut";
import DiscoveryPage from "./components/DiscoveryPage";

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
        <MemberPopOutProvider>
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
            <ProtectedRoute exact path="/channels/@me">
              <ServerSideBarNE />
              <FriendsPage />
            </ProtectedRoute>
            <ProtectedRoute path="/servers/">
              <ServerList />
            </ProtectedRoute>
            <ProtectedRoute path="/channels/@me/:channelId">
              <ServerSideBarNE />
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
              <DiscoveryPage />
            </ProtectedRoute>
            <ProtectedRoute path="/guild-dicovery">
              <ServerSideBarNE />
              <DiscoveryPage />
            </ProtectedRoute>
          </Switch>
        </MemberPopOutProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
