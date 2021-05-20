import React from "react";
import Grid from "@material-ui/core/Grid";
import {Button, ButtonBase, Typography} from "@material-ui/core";
import {EditUserData, UserPosts, MessageAdmin, EditPost} from './components'
import {makeStyles} from "@material-ui/core/styles";
import blank from '../../assets/images/blank.png'
import Container from "@material-ui/core/Container";
import {
  Switch,
  useRouteMatch,
  Route,
  useHistory
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 300,
    height: 300,
  },
  img: {
    // margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));


const UserPage = ({user}) => {

  let {path, url} = useRouteMatch();
  const history = useHistory()
  const classes = useStyles();

  return (
    <>
      {user ?
        <Grid
          container
          item xs={12}
          justify="space-around"
          alignContent="center"
        >
          <Grid
            container
            item xs={3}
            direction="column"
            justify="center"
            alignContent="center"
            alignItems={"center"}
            spacing={3}
          >
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={blank}/>
              </ButtonBase>
            </Grid>
            <Grid item >
              <Button
                variant="contained"
                color={"secondary"}
                onClick={() => history.push(`${url}/user-posts`)}
              >
                Posts
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color={"secondary"}
                onClick={() => history.push(`${url}/edit`)}
              >
                Dane
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color={"secondary"}
                onClick={() => history.push(`${url}/message`)}
              >
                Message to admin
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            item xs={9}
            direction="column"
            justify="space-around"
            alignContent="center"
          >
            <Grid
              container
              direction="row"

              justify="space-around"
              alignItems="flex-start"
            >
            </Grid>
            <Grid
              container
              justify="space-around"
            >
              <Switch>
                <Route exact path={`${path}/message`}>
                  <MessageAdmin/>
                </Route>
                <Route exact path={`${path}/user-posts/`}>
                  <UserPosts userId={user.pk}/>
                </Route>
                <Route exact path={`${path}/edit`}>
                  <EditUserData user={user}/>
                </Route>
              </Switch>
            </Grid>
          </Grid>
        </Grid>
        :
        null
      }
    </>
  );
}

export default UserPage;