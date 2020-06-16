import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import Scream from '../components/Scream';
import Profile from '../components/Profile';

import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

class home extends Component {
    
    componentDidMount() {
        this.props.getScreams();
    }
    render() {
        const { screams } = this.props.data;
        const postScreams = screams.map(scream => (
            <Scream key={scream.screamId} scream={scream} />
        ))
        return (
          <Grid container spacing={8}>
              <Grid item sm={8} xs={12}>
                  <p>Content....</p>
                  {postScreams}
              </Grid>
              <Grid item sm={4} xs={12}>
                  <Profile />
              </Grid>
          </Grid> 
        )
    }
}


export const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps, { getScreams })(home);
