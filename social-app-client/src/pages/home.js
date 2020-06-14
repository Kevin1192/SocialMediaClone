import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import Scream from '../components/Scream';
import Profile from '../components/Profile';

export class home extends Component {
    state = {
        screams: []
    }
    componentDidMount() {
        axios.get('/screams')
        .then(res => {
            console.log(res);
            this.setState({
                screams: res.data
            })
        })
        .catch(err => console.log(err));
    }
    render() {
        const screams = this.state.screams.map(scream => (
            <Scream key={scream.screamId} scream={scream} />
        ))
        return (
          <Grid container spacing={8}>
              <Grid item sm={8} xs={12}>
                  <p>Content....</p>
                  {screams}
              </Grid>
              <Grid item sm={4} xs={12}>
                  <Profile />
              </Grid>
          </Grid> 
        )
    }
}

export default home
