import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from "../../axios.config";
import {Grid, makeStyles} from '@material-ui/core';
import {LinkBox, Sort} from '../../components';

const useStyles = makeStyles((theme) => ({
  main: {
    width: `${theme.feedWidth}`,
    minHeight: '100vh',
    margin: '0 auto',
  },
}));

const Posts = ({user}) => {
  const classes = useStyles();
  const [posts, setPosts] = useState(null)
  const [orgPosts, setOrgPosts] = useState(null);
  const [votes, setVotes] = useState({})
  const {id} = useParams();

  const fetchPosts = () => {

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
            console.log(res.data)
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

  }, [id]);

  useEffect(() => {
    fetchVotes();
  },[user])

  const onSort = (e) => {
    setPosts([...e]);

  };

  return (
    <Grid
      container
      direction="column"
      className={classes.main}
      spacing={6}
      alignContent={"center"}
    >
      <Grid item >
        <Sort posts={orgPosts} onSort={onSort}/>
      </Grid>
      <Grid
        item xs={10}
        container
        direction="row"
        id="postsList"
        alignContent={"center"}
        spacing={3}
        justify={"space-between"}

      >
        {posts
          ? posts.map((post) =>
            <Grid item key={post.id}>
              <LinkBox key={post.id} post={post} user={user} votes={votes}/>
            </Grid>) :
          null
        }
      </Grid>
    </Grid>
  );
};


export default Posts;
