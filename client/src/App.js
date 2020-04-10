import React, { useEffect, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SearchBarAuth from "./components/layout/SearchBarAuth";
import Navbar from "./components/layout/Navbar";
import Logs from "./components/logs/Logs";
import AddBtnAuth from "./components/layout/AddBtnAuth";
import AddLogModal from "./components/logs/AddLogModal";
import EditLogModal from "./components/logs/EditLogModal";
import AddTechModal from "./components/techs/AddTechModal";
import TechListModal from "./components/techs/TechListModal";
import EditTechModal from "./components/techs/EditTechModal";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Register from "./components/auth/Register";
import Landing from "./components/layout/Landing";

import PrivateRoute from "./components/routing/PrivateRoute";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";

// Check localstorage for token - if there is, pass into setAuthToken function (setAuthToken.js file)
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    M.AutoInit(); // initialise materialise JS on load
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <SearchBarAuth />
          <div className='container'>
            <Alert />
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <PrivateRoute exact path='/logs' component={Logs} />
            </Switch>

            <AddLogModal />
            <AddBtnAuth />
            <EditLogModal />
            <TechListModal />
            <AddTechModal />
            <EditTechModal />
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
