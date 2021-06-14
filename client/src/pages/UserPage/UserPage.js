import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {Button, ButtonBase} from "@material-ui/core";
import {UserData, UserPosts, MessageAdmin, EditData} from './components'
import {makeStyles} from "@material-ui/core/styles";

import {
  Switch,
  useRouteMatch,
  Route,
  useHistory
} from "react-router-dom";
import axios from "../../axios.config";


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
  const [userAvatar, setUserAvatar] = useState(null)
  let {path, url} = useRouteMatch();
  const history = useHistory()
  const classes = useStyles();

  const uploadProfileImage = (event) => {

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('avatar', file);

    reader.onloadend = () => {
      setUserAvatar(reader.result)

    }

    const config = {
      headers: {
        'Authorization': `Token ${localStorage.getItem('isLogged')}`,
        'Content-Type': 'multipart/form-data'
      }
    }
    axios.post(`v1/wishub/users/avatar/`, formData, config)
      .then(res => {
        if (res.status === 200) {

        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
        }
      });

  }

  const getUserAvatar = () => {
    const config = {
      headers: {
        'Authorization': `Token ${localStorage.getItem('isLogged')}`,
      }
    }
    axios.get(`v1/wishub/users/avatar/`, config)
      .then(res => {
        if (res.status === 200) {
          setUserAvatar(`data:image/png;base64,${res.data.avatar}`);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
        }
      });
  }

  useEffect(() => {
    getUserAvatar()
  }, [])

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
            justify={"flex-start"}
            alignItems={"center"}
            spacing={1}
          >

            {userAvatar ?

              <Grid item>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src={userAvatar}/>
                </ButtonBase>
              </Grid> : null
            }

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
                <UserPosts user={user}/>
              </Route>
              <Route exact path={`${path}/message`}>
                <MessageAdmin/>
              </Route>
              <Route exact path={`${path}/user-posts/`}>
                <UserPosts user={user}/>
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