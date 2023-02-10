import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LandingPage from "pages/LandingPage";
import Auth from "pages/Auth/Auth";
import AuthVerify from "pages/Auth/AuthVerify";
import NotFound from "pages/404";
import "assets/scss/style.scss";
import ResetPassword from "pages/Auth/ResetPassword";
import RecoverAccount from "pages/Auth/RecoverAccount";
import NewPassword from "pages/Auth/NewPassword";

const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <div className="App">
      <Router history={history} basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/" exact component={LandingPage} />

          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/" />)} />
          <Route path="/authVerify/:token" component={AuthVerify} />
          <Route path="/resetPassword" exact component={ResetPassword} />
          <Route path="/recoverAccount" exact component={RecoverAccount} />
          <Route path="/newPassword/:token" exact component={NewPassword} />
          <Route path="*" exact component={NotFound} />
        </Switch>
      </Router>

      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
