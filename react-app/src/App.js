import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { authenticate } from "./store/session";
import Landing from "./views/landing";
import SignIn from "./views/signin";
import SignUp from "./views/signup";
import './App.css';
import Dashboard from "./views/dashboard";

function App() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
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
            {/* <Route path='/team/:teamId'>
              <CypherApp/>
            </Route> */}
        </Switch>
      </div>

      )}
    </>

  );
}

export default App;
