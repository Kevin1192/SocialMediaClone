import React, { Component } from 'react'
import {Link} from 'react-router-dom';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


// Card
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography  from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';


const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}


export class Scream extends Component {
    render() {
        dayjs.extend(relativeTime);
        const { classes, scream: { userImage, body, createdAt, userHandle, screamId, likeCount, commentCount } } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardMedia image={userImage} title="Profile image" className={classes.image}/>
                    <CardContent className={classes.content}>
                        <Typography variant="h5" color='primary' component={Link} to={`/users/${userHandle}`}>{userHandle}</Typography>
                        <Typography variant='body2' color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
                        <Typography variant='body1'>{body}</Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(Scream);