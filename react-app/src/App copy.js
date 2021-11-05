import { Switch, Route } from "react-router-dom";
import ServerSideBar from "./components/ServerSideBar";
import DMPage from "./components/DMPage";
import GroupPage from "./components/GroupPage";
import ServerPage from "./components/ServerPage";
import LoginPage from "./components/LoginPage/LoginPage";
import MyChannelsBar from "./components/MyChannelsBar";
import "./App.css";
import "./reset.css";

function App() {
  return (
    <div id="app_container">
      <ServerSideBar />
      <Switch>
        <Route path="/channels/@me">
          <MyChannelsBar />
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
          <LoginPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
