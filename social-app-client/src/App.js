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
// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
console.log(token);
let authenticated;
if (token){
  const decodededToken = jwtDecode(token);
  if (decodededToken.exp * 1000 < Date.now()){
    console.log('token', token)
    console.log('time to expire', decodededToken.exp * 1000)
    authenticated = false
  } else {
console.log("token", token);
console.log("time to expire", decodededToken.exp * 1000);
    authenticated = true
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
            <AuthRoute exact path="/login" component={login}  authenticated={authenticated} />
            <AuthRoute exact path="/signup" component={signup} authenticated={authenticated} />
            <Route exact path="/" component={home} />
          </Switch>
        </div>
      </Router>
    </Provider>
    </MuiThemeProvider>
  );
}

export default App;
