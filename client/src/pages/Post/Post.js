import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from "../../axios.config";
import {Grid, makeStyles, Button} from '@material-ui/core';
import {LinkBox} from '../../components';
import {Controller, FormProvider, useForm} from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import {Comment} from './components'

const useStyles = makeStyles((theme) => ({
  main: {
    width: `${theme.feedWidth}px`,
    minHeight: '100vh',
    margin: '0 auto',
  },
}));


const Post = ({user}) => {

  const classes = useStyles();
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])

  const {id} = useParams();

  const {handleSubmit, control, reset} = useForm();


  const fetchPost = () => {
    axios.get(`/v1/wishub/posts/${id}`)
      .then(res => {
        if (res.status === 200) {
          setPost(res.data)
          return axios.get(`/v1/wishub/posts/${id}/comments`)
        }
      })
      .then(res => {
        if (res.status === 200) {
          setComments(res.data)
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
        }
      });
  }

  useEffect(() => {
    fetchPost();
  }, []);


  const handleCommentAdder = (comment) => {

    comment['author'] = user.pk
    axios.post(`/v1/wishub/posts/${id}/comment/`, comment)
      .then(res => {
        if (res.status === 200) {
          reset()
          return axios.get(`/v1/wishub/posts/${id}/comments`)
        }
      })
      .then(res => {
        if (res.status === 200) {
          setComments(res.data)
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
          let err = document.getElementById("error");
          let message = error.response.data["body"];
          typeof message !== 'undefined' ? err.innerHTML = message : err.innerHTML = "Error";
          err.style.color = "red";
        }
      });
  };

  return (
    <Grid
      container
      direction="column"
      className={classes.main}
      alignItems={"center"}
    >
      <Grid
        item xs={8}
        style={{marginTop: 20}}
      >
        {post
          ? <LinkBox key={post.id} post={post}/> : null
        }
      </Grid>
      <Grid
        container
        direction="column"
        id="commentsList"
        alignContent={"center"}
      >
        {comments
          ? comments.map((comment) => <Grid item><Comment key={comment.id} comment={comment}/> </Grid>) : null
        }
      </Grid>
      <Grid item xs={6} style={{marginBottom: 20}}>
        <FormProvider {...handleSubmit}>
          <form onSubmit={handleSubmit(handleCommentAdder)}>
            <Controller
              render={({field}) => (
                <TextField {...field} fullWidth label="New Comment" required onChange={(e) => field.onChange(e)}
                           value={field.value} inputProps={{maxLength: 300}}/>
              )}
              name="body"
              control={control}
              defaultValue=""
            />

            <Button type="submit" fullWidth variant="contained" color="primary" disabled={user == null}>
              {user != null ? 'Add comment' : 'Login in'}
            </Button>
          </form>
        </FormProvider>
      </Grid>
    </Grid>
  );
};

export default Post;