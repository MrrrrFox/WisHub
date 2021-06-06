import React, {useEffect, useState} from "react";
import {Grid, makeStyles} from "@material-ui/core";
import Carousel from 'react-material-ui-carousel'
import {LinkBox} from '../../components'
import axios from "../../axios.config";


const useStyles = makeStyles((theme) => ({
  main: {
    width: `${theme.feedWidth}px`,
    minHeight: '64.5vh',
    margin: '0 auto',
  },

}));

const HomePage = () => {

  const classes = useStyles();
  const [posts, setPosts] = useState(null)

  const fetchPosts = () => {
    axios.get(`v1/wishub/posts/`)
      .then(res => {
        if (res.status === 200) {
          setPosts(res.data)
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
      });
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems={"center"}
      className={classes.main}
    >
      <Grid item xs={8}>
        <Carousel>
          {
            posts ? posts.map((post) => <LinkBox key={post.id} post={post}/>) : null
          }
        </Carousel>
      </Grid>
    </Grid>
  );
}

export default HomePage