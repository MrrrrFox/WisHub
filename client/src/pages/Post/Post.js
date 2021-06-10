// const {id} = useParams()
// po tym id zrobic zapytanie o posta
// get post -> dane: post -> link box
// get comments
//Layout
//link box
// add comment
// comments -> GRid -> column -> kazdy comment to grid item w ktorym jest componnet "comment

import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from "../../axios.config";
import { Grid, makeStyles, CircularProgress, Button } from '@material-ui/core';
import { LinkBox, Sort } from '../../components';
import {Controller, FormProvider, useForm} from "react-hook-form";
import TextField from "@material-ui/core/TextField";

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

const { handleSubmit, control } = useForm();

const Post = ({user}) => {
  const classes = useStyles();
  const [comment, post, setPost, setComment] = useState(null)
  const { id } = useParams();
  let comments

  const fetchPost = () => {
    axios.get(`${post.id}/comments`)
      .then(res => {
        if(res.status === 200){
          console.log(res.data)
          setPost(res.data)
        }
      })
      .catch((error) => {
        if( error.response ){
          console.log(error.response.data); // => the response payload
          }
      });
  }

  useEffect(() => {
    fetchPost();
  }, [id]);

  const onSort = (e) => {
    setComment(e);
    console.log(comment);
  };

  const handleCommentAdder = (comment) => {
    console.log(comment);
              comment['author'] = user.pk
              axios.post('/${post.id}/comments/', comment)
                .then(res => {
                  if(res.status === 201){
                    history.push(`/comments/${comment.id}`)
                  }
                })
                .catch((error) => {
                  if( error.response ){
                    console.log(error.response.data); // => the response payload
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
    justify="flex-start"
    direction="row"
    className={classes.main}
    >
    <Grid
      container
      justify="flex-start"
      direction="column"
      >
        <Sort comments={comment} onSort={onSort}/>
    </Grid>
      {/*<Grid*/}
      {/*  container*/}
      {/*  justify="flex-start"*/}
      {/*  direction="column"*/}
      {/*  id="postsList"*/}
      {/*>*/}
      {/*  {post*/}
      {/*    ? <LinkBox key={post.id} post={post} /> : null*/}
      {/*    }*/}
      {/*</Grid>*/}
      <Grid
        container
        justify="flex-start"
        direction="column"
        id="commentsList"
      >
        {comments
          ? comments.map((comment) => <LinkBox key={comment.id} comment={comment} />) : null
          }
      </Grid>
      <div className={classes.paper}>
      <FormProvider { ...handleSubmit }>
        <form onSubmit = {handleSubmit(handleCommentAdder)} className={classes.form}>
          {/*<Controller*/}
          {/*  render = {({field}) => (*/}
          {/*      <TextField {...field} fullWidth label="Author" required onChange={(e) => field.onChange(e)}*/}
          {/*          value={field.value}/>*/}
          {/*  )}*/}
          {/*  name="author"*/}
          {/*  control={control}*/}
          {/*  defaultValue=""*/}
          {/*  label="Author"*/}
          {/*/>*/}

          <Controller
            render = {({field}) => (
                <TextField {...field} fullWidth label="New Comment" required onChange={(e) => field.onChange(e)}
                           value={field.value} inputProps={{ maxLength: 300 }}/>
            )}
            name="body"
            control={control}
            defaultValue=""
          />

          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Add
          </Button>
        </form>
        </FormProvider>
      </div>
    </Grid>
  );
};

export default Post;