import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


// Theme
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import deepOrange from "@material-ui/core/colors/deepOrange";

// Components
import Navbar from './components/Navbar';


// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: {
      main: "#f44336",
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route path="/login" component={login} />
            <Route path="/signup" component={signup} />
            <Route path="/" component={home} />
          </Switch>
        </div>
      </Router>
    </div>
    </MuiThemeProvider>
  );
}

export default App;
