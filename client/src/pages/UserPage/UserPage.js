import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import NavItem from "../../components/NavItem";
// import {AppBar} from "@material-ui/core";
import {Toolbar, AppBar, Button, CardMedia, ButtonBase} from "@material-ui/core";
import {Image} from "@material-ui/icons";
import {Card} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
// import Button
import blank from '../../assets/images/blank.png'
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
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));


const UserPage = (user) => {

  const classes = useStyles();
  return (<div>

      <Grid
        container
        // direction="row"
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
            direction="row"
            justify="space-around"
            alignContent="center"
            // className={classes.root}
          >
            <Button >Posts</Button>
            <Button >Edit</Button>
            <Button >Message to admin</Button>
          </Grid>

        </Grid>
      </Grid>
      <Grid

      >
        <Grid
            container
            item xs={3}

            direction="column"
            justify="space-around"
            alignContent="center"
          >
            <Grid item>Ala</Grid>
          </Grid>
        <Grid
          container
          item xs={9}
          direction="column"
          justify="space-around"
          alignContent="center"
        >
          <Grid item>Ala</Grid>
          <Grid item>Ala</Grid>
        </Grid>

      </Grid>
    </div>
  );
}

export default UserPage;