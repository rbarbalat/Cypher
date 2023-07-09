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
import ProtectedRoute from "./components/auth/ProtectedRoute"
import { thunkGetUsers } from "./store/users";

function App() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(authenticate())
    .then(() => setIsLoaded(true))
    .then(() => dispatch(thunkGetEveryTeam()))
    .then(() => dispatch(thunkGetUsers()))
    .catch(error => error);
  }, [dispatch]);

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
            <ProtectedRoute exact path='/dashboard'>
              <Dashboard/>
            </ProtectedRoute>
            <ProtectedRoute path='/create-team/new'>
              <CreateTeamForm/>
            </ProtectedRoute>
            <ProtectedRoute exact path='/create-team'>
              <CreateTeam/>
            </ProtectedRoute>
            <ProtectedRoute path='/team/:teamId'>
              <CypherApp/>
            </ProtectedRoute>
        </Switch>
      </div>
      )}
    </>

  );
}

export default App;
