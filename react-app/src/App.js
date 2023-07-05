import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { authenticate } from "./store/session";
import Landing from "./views/landing";
import SignIn from "./views/signin";
import SignUp from "./views/signup";
import Dashboard from "./views/dashboard";
import CypherApp from "./views/cypherapp";
import './App.css';
import CreateTeam from "./views/createteam";
import CreateTeamForm from "./views/createteamform";
import { thunkGetEveryTeam } from "./store/teams";

function App() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate())
    .then(() => setIsLoaded(true))
    .then(() => dispatch(thunkGetEveryTeam()));
  }, [dispatch]);
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) {
    history.push('/dashboard')
  }

  return (
    <>
    {
      isLoaded && (
        <div id='app--wrapper'>
          <Switch>
            <Route exact path='/'>
              <Landing/>
            </Route>
            <Route exact path='/sign-in'>
              <SignIn />
            </Route>
            <Route exact path='/sign-up'>
              <SignUp />
            </Route>
            <Route exact path='/dashboard'>
              <Dashboard/>
            </Route>
            <Route path='/create-team/new'>
              <CreateTeamForm/>
            </Route>
            <Route exact path='/create-team'>
              <CreateTeam/>
            </Route>
            <Route path='/team/:teamId'>
              <CypherApp/>
            </Route>
        </Switch>
      </div>

      )}
    </>

  );
}

export default App;
