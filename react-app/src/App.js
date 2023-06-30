import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Landing from "./views/landing";
import SignIn from "./views/signin";
import SignUp from "./views/signup";
import './App.css';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // if (isLoaded) return <Redirect to="/dashboard"/>

  return (
    // <>
    //   <Navigation isLoaded={isLoaded} />
    //   {isLoaded && (
    //     <Switch>
    //       <Route path="/login" >
    //         <LoginFormPage />
    //       </Route>
    //       <Route path="/signup">
    //         <SignupFormPage />
    //       </Route>
    //     </Switch>
    //   )}
    // </>
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

          </Route>
          {/* <Route path='/team/:teamId'>
            <CypherApp/>
          </Route> */}
      </Switch>
    </div>
  );
}

export default App;
