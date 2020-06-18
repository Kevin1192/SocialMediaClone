import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MyButton from '../util/MyButton';
import PostScream from './PostScream';

//MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home';

class Navbar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
          <AppBar>
            <Toolbar className="nav-container">
              <Link to="/" className='logo'>Owl</Link>
              <div>
              {authenticated ? (
                <Fragment>
                  <PostScream />
                  <Link to="/">
                    <MyButton tip="home">
                      <HomeIcon />
                    </MyButton>
                  </Link>
                </Fragment>
              ) : (
                <Fragment>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/">
                    Home
                  </Button>
                  <Button color="inherit" component={Link} to="/signup">
                    Signup
                  </Button>
                </Fragment>
              )}
              </div>
            </Toolbar>
          </AppBar>
        );
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);