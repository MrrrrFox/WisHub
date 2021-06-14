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

const HomePage = ({user}) => {

  const classes = useStyles();
  const [posts, setPosts] = useState(null)
  const [votes, setVotes] = useState({})

  const fetchPosts = () => {
    axios.get(`v1/wishub/posts/`)
      .then(res => {
        if (res.status === 200) {
          setPosts(res.data)
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
        }
      });
  }

const fetchVotes = () => {
    if (user != null) {
      const config = {headers: {'Authorization': `Token ${localStorage.getItem('isLogged')}`}}
      axios.get(`v1/wishub/user-voted-posts`, config)
        .then(res => {
          if (res.status === 200) {
            setVotes(res.data);
          }
        })
        .catch((error) => {
          if (error.response) {
            console.error(error.response.data);
          }
        });
    }

  }

  useEffect(() => {
    fetchPosts();
    fetchVotes()
  }, []);

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignContent={"center"}
      className={classes.main}
    >
      <Grid item>
        <Carousel
          fullHeightHover={false}
        >
          {
            posts ? posts.map((post) => <LinkBox key={post.id} post={post} votes={votes} user={user}/>) : null
          }
        </Carousel>
      </Grid>
    </Grid>
  );
}

export default HomePage