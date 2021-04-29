import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from "../../axios.config";
import { Grid, makeStyles, CircularProgress } from '@material-ui/core';
import { LinkBox } from '../../components';

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

const Posts = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState(null)
  const { id } = useParams();

  const fetchPosts = () => {
    console.log(id)
    axios.get(`v1/wishub/posts/${id}/by-subject`)
      .then(res => {
        if(res.status === 200){
          console.log(res.data)
          setPosts(res.data)
        }
      })
      .catch((error) => {
        if( error.response ){
          console.log(error.response.data); // => the response payload
          }
      });
  }

  useEffect(() => {
    fetchPosts();
  }, [id]);


  return (
<Grid
      container
      justify="flex-start"
      direction="column"
      className={classes.main}
    >
      {posts
        ? posts.map((post) => <LinkBox key={post.id} post={post} />) : null
        }
    </Grid>
  );
};



export default Posts;
