
import React, { Component } from 'react';
import store from './store';
import jwt_decode from 'jwt-decode';
import {Provider} from 'react-redux';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import AppRouter from './routers/AppRouter';
import { Grid } from 'react-bootstrap';
import './style/App.css';

if(localStorage.jwtToken !== 'undefined' && localStorage.jwtToken !== undefined) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

class App extends Component {

  render() {
    return (
      <Grid >
       <Provider store={store}>
          <AppRouter/>
        </Provider>
      </Grid>
    );
  }
}

export default App;