import React from 'react';
import { makeStyles, Grid, Typography, Button } from '@material-ui/core';
import logo from '../../icons/logo.png';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';



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
}));

const TopBar = ({username}) => {
  const classes = useStyles();

  return (
    <Grid className={classes.wrapper} container justify="space-between">
      <div className={classes.logo} />
      <Typography className={classes.text} variant="h5">
      </Typography>
      <Typography className={classes.text} variant="h5">

        <Grid direction="column" className={classes.userSection}>
          <div>
            <Typography variant="body4" className={classes.user}>
              {username ? `Hello, ${username}!` : 'Guest'}
            </Typography>
            <div className={classes.iconWrapper}>
              <AccountCircleIcon></AccountCircleIcon>
            </div>
          </div>
          {username ? (
            <Button
              className={classes.loginButton}
              onClick={() => localStorage.setItem('isLogged', 'false')}
              color="secondary"
            >
              Logout
            </Button>
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
