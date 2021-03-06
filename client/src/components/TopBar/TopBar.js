import React from 'react';
import {makeStyles, Grid, Typography, Button, Avatar} from '@material-ui/core';
import logo from '../../icons/logo.png';

import axios from "../../axios.config";
import {useHistory, Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    width: '100vw',
    height: `${theme.topBarHeight}px`,
    backgroundColor: theme.palette.main,
    alignItems: 'center',
  },
  logo: {
    width: '400px',
    height: '100%',
    background: `url(${logo}) no-repeat`,
    backgroundSize: '100%',
    display: 'block',

  },
  text: {
    color: theme.palette.navbar,
  },
  userSection: {
    overflow: 'hidden',
    margin: '0 50px',
    width: '100%',
  },
  loginButton: {
    fontSize: '18px',
  },
  iconWrapper: {
    overflow: 'hidden',
    position: 'absolute',
    top: '15px',
    right: '30px',
  },
  user: {
    overflow: 'hidden',
    marginRight: '20px',
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const TopBar = ({isLogged, user, setUser, userAvatar}) => {
  const classes = useStyles();
  const history = useHistory()

  const logoutUser = () => {
    axios.post('v1/users/auth/logout/', {"Authorization": isLogged})
      .then(res => {
        if (res.status === 200) {
          localStorage.clear();
          setUser(null)
          window.dispatchEvent(new Event('storage'));
          history.push('/')
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response);
        }
      });
  }


  return (
    <Grid className={classes.wrapper} container justify="space-between">
      <Link to={"/"} className={classes.logo}/>

      <Typography className={classes.text} variant="h5">
      </Typography>
      <Typography className={classes.text} variant="h5">

        <Grid className={classes.userSection}>
          <div>
            <Typography variant="body4" className={classes.user}>
              {user != null ? user.username : 'Guest'}
            </Typography>

            <div className={classes.iconWrapper}>
              <Link to={user ? `/user/${user.pk}` : '/signin'} >
                <Avatar className={classes.small} src={userAvatar}/>
              </Link>
            </div>
          </div>
          {isLogged !== null ? (
            <>
              <Button
                className={classes.loginButton}
                onClick={() => logoutUser()}
                color="secondary"
              >
                Logout
              </Button>
              <Button
                className={classes.loginButton}
                href="/post-add"
                color="secondary"
              >
                Add post
              </Button>
            </>

          ) : (
            <Button
              className={classes.loginButton}
              href="/signin"
              color="secondary"
            >
              Login
            </Button>
          )}
        </Grid>
      </Typography>
    </Grid>
  );
};


export default TopBar;
