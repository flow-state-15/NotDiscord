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
import ServerList from "./components/ServerList"
import DMPage from "./components/DMPage";
import GroupPage from "./components/GroupPage";
import ServerPage from "./components/ServerPage";
import LoginPage from "./components/LoginPage/LoginPage";
import MyChannelsBar from "./components/MyChannelsBar";
import { authenticate } from "./store/session";
import ServerSideBarNE from "./components/ServerSideNE";
import FriendsSection from "./components/FriendsSection";
import "./reset.css";
import "./App.css";

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
        {/* <ServerSideBar /> */}
        <Switch>
          <Route path="/channels/@me">
            <MyChannelsBar />
          </Route>
          <Route path="/servers/">
            <ServerList />
          </Route>
          <Route path="/channels/DM">
            <DMPage />
          </Route>
          <Route path="/channels/group">
            <GroupPage />
          </Route>
          <Route path="/channels/server">
            <ServerPage />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/test">
            <ServerSideBarNE />
            <MyChannelsBar />
            <FriendsSection />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
