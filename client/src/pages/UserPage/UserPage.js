import React from "react";
import Grid from "@material-ui/core/Grid";
import {Button, ButtonBase, Typography} from "@material-ui/core";
import {EditUserData, UserPosts, MessageAdmin,EditPost} from './components'
import {makeStyles} from "@material-ui/core/styles";
import blank from '../../assets/images/blank.png'
import Container from "@material-ui/core/Container";
import {
  Switch,
  useRouteMatch,
  Route,
  useHistory} from "react-router-dom";

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
    // width: 128,
    // height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));


const UserPage = ({user}) => {

  let { path, url } = useRouteMatch();
  const history = useHistory()
  const classes = useStyles();

  return(
    <>
      {user ? <Container>
             <Grid
               container
               justify="space-around"
               alignContent="center"
             >
               <Grid
                container
                item xs={3}
                direction="column"
                justify="space-around"
                alignContent="center"
               >
                <Grid item>
                  <ButtonBase className={classes.image}>
                    <img className={classes.img} alt="complex" src={blank} />
                  </ButtonBase>

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
                  item xs={9}
                  justify="space-around"
                  alignContent="center"
                >
                  <Button onClick={() => history.push(`${url}/user-posts`)}>Posts</Button>
                  <Button onClick={() => history.push(`${url}/edit`)}>Edit</Button>
                  <Button onClick={() => history.push(`${url}/message`)}>Message to admin</Button>
                </Grid>

              </Grid>
            </Grid>
            <Grid
              container
              item xs={12}
              justifyContent={"flex-end"}
              alignItems={"flex-start"}
                  //  direction="column"
                  //  justify="flex-end"
                  // alignContent="flex-end"
            >
              {/*<GR*/}
              <Switch>
                <Route exact path={`${path}/message`}>
                       <MessageAdmin/>
                </Route>
                <Route exact path={`${path}/user-posts/`}>
                  <UserPosts userId={user.pk}/>
                </Route>
                <Route exact path={`${path}/edit`}>
                  <EditUserData/>
                </Route>
              </Switch>
            </Grid>
      {/*<Grid*/}
      {/*  container*/}
      {/*  justify="space-around"*/}
      {/*  alignContent="center"*/}
      {/*>*/}
      {/*  <Grid*/}
      {/*      container*/}
      {/*      item xs={3}*/}

      {/*      direction="column"*/}
      {/*      justify="space-around"*/}
      {/*      alignContent="center"*/}
      {/*    >*/}
      {/*      <Grid item>{user.username}</Grid>*/}
      {/*    </Grid>*/}


      {/*</Grid>*/}
      </Container>
        :
        null}
    </>
  );
}

export default UserPage;