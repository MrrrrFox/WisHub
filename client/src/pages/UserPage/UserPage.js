import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import {Button, ButtonBase} from "@material-ui/core";
import {UserData, UserPosts, MessageAdmin, EditData} from './components'
import {makeStyles} from "@material-ui/core/styles";
import blank from '../../assets/images/blank.png'
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
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  marg: {
    marginBottom: '80px'
  },
  input: {
    display: 'none',
  },
}));


const UserPage = ({user, getUser}) => {
  const [userImage, setUserImage] = useState(null)
  let {path, url} = useRouteMatch();
  const history = useHistory()
  const classes = useStyles();

  const uploadProfileImage = (event) => {

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setUserImage(reader.result)
    }

  }

  return (
    <>
      {user ?
        <Grid
          container
          item xs={12}
          justify="space-around"
          alignContent="center"
          className={classes.marg}
        >
          <Grid
            container
            item xs={3}
            direction="column"
            justify="center"
            alignContent="center"
            alignItems={"center"}
            spacing={1}
          >
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={userImage || blank}/>
              </ButtonBase>
            </Grid>
            <Grid item>
              <UserData user={user}/>
            </Grid>
            <Grid item>
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
                Edit
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
            <Grid item>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={uploadProfileImage}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  color={"secondary"}
                >
                  Upload image
                </Button>
              </label>

            </Grid>
          </Grid>
          <Grid
            container
            item xs={9}
            direction="column"
            justify="space-around"
            alignItems={"center"}
          >
            <Switch>
              <Route exact path={`${path}`}>
                <UserPosts userId={user.pk}/>
              </Route>
              <Route exact path={`${path}/message`}>
                <MessageAdmin/>
              </Route>
              <Route exact path={`${path}/user-posts/`}>
                <UserPosts userId={user.pk}/>
              </Route>
              <Route exact path={`${path}/edit`}>
                <EditData user={user} getUser={getUser}/>
              </Route>
            </Switch>

          </Grid>
        </Grid>
        :
        null
      }
    </>
  );
}

export default UserPage;