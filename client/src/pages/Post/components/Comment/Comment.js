import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { useForm, Controller, FormProvider } from "react-hook-form";
import axios from "../../axios.config";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const Comment = ({user}) => {

  const { handleSubmit, control } = useForm();
  const classes = useStyles();
  const history = useHistory();
  //const today = new Date();
  //const { post_id: post_id_string } = parse(props.location.search);
  //const post_id = post_id_string ? parseInt(post_id_string, 10) : '';
  //const redirect = post_id ? `/posts/${post_id}/show/comments` : false;

  const handleComment = (comment) => {
    console.log(comment)
    comment['author'] = user.pk
    axios.post('v1/wishub/posts/${id}/comments', comment)
      .then(res => {
        if(res.status === 201){
          history.push(`/comments/${comment.id}`)
        }
      })
      .catch((error) => {
        if( error.response ){
          console.log(error.response.data); // => the response payload
          }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Comments
        </Typography>
        <FormProvider { ...handleSubmit }>
        <form onSubmit = {handleSubmit(handleComment)} className={classes.form}>

          <Controller
            render = {({field}) => (
                <TextField {...field} fullWidth label="Title" required onChange={(e) => field.onChange(e)}
                           value={field.value} inputProps={{ maxLength: 100 }}/>
            )}
            name="title"
            control={control}
            defaultValue=""
          />

          <Controller
            render = {({field}) => (
                <TextField {...field} fullWidth label="Text" required onChange={(e) => field.onChange(e)}
                           value={field.value} inputProps={{ maxLength: 300 }}/>
            )}
            name="text"
            control={control}
            defaultValue=""
          />

          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Add
          </Button>
        </form>
        </FormProvider>
      </div>
    </Container>
  );
}

export default Comment;