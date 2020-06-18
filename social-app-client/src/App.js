import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
// Theme
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';


// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
import axios from 'axios';
// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL =
 "https://us-central1-socialapp-12ef9.cloudfunctions.net/api";

const token = localStorage.FBIdToken;

if (token){
  const decodededToken = jwtDecode(token);
  if (decodededToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}


function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <AuthRoute exact path="/login" component={login}   />
            <AuthRoute exact path="/signup" component={signup}  />
            <Route exact path="/users/:handle" component={user} />
            <Route exact path="/users/:handle/scream/:screamId" component={user} />
            <Route exact path="/" component={home} />
          </Switch>
        </div>
      </Router>
    </Provider>
    </MuiThemeProvider>
  );
}

export default App;
