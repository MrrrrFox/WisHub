import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from "../../axios.config";
import {Grid, makeStyles} from '@material-ui/core';
import {LinkBox, Sort} from '../../components';

const useStyles = makeStyles((theme) => ({
  main: {
    width: `${theme.feedWidth}px`,
    minHeight: '100vh',
    margin: '0 auto',
  },
  loader: {
    position: 'absolute',
    left: '50%',
    top: '40vh',
    width: '100px',
    height: '100px',

    transform: 'translateX(-50%)',
  },
}));

const Posts = ({user}) => {
  const classes = useStyles();
  const [posts, setPosts] = useState(null)
  const [orgPosts, setOrgPosts] = useState(null);
  const [votes, setVotes] = useState({})
  const {id} = useParams();

  const fetchPosts = () => {
    // const config = {headers: {'Authorization': `Token ${localStorage.getItem('isLogged')}`}}
    axios.get(`v1/wishub/posts/${id}/by-subject`)
      .then(res => {
        if (res.status === 200) {

          setPosts(res.data)
          setOrgPosts(res.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data);
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
    fetchVotes();
  }, []);

  const onSort = (e) => {
    setPosts([...e]);

  };

  return (
    <Grid
      container
      justify="flex-start"
      direction="row"
      className={classes.main}
    >
      <Grid
        container
        justify="flex-start"
        direction="column"
      >
        <Sort posts={orgPosts} onSort={onSort}/>
      </Grid>
      <Grid
        container
        direction="column"
        id="postsList"
        alignContent={"center"}
        spacing={2}
      >
        {posts
          ? posts.map((post) => <LinkBox key={post.id} post={post} user={user} votes={votes}/>) : null
        }
      </Grid>
    </Grid>
  );
};


export default Posts;
