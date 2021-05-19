import React, { useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { useForm, Controller, FormProvider } from "react-hook-form";
import axios from "../../axios.config";


const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        WisHub
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

const subjects = [
  { value: "mathematics", label: "Mathematics" },
  { value: "physics", label: "Physics" },
  { value: "programming", label: "Programming" },
  { value: "computer science", label: "Computer Science" },
];

const levels = [
  { value: "BE", label: "Beginer" },
  { value: "IN", label: "Intermediate" },
  { value: "AD", label: "Advanced" },
];

const PostAdder = () => {

  const { handleSubmit, control } = useForm();
  const classes = useStyles();
  const history = useHistory();


  const handlePostAdder = (post) => {

    axios.post('v1/users/auth/post-add/', post)
      .then(res => {
        if(res.status === 201){
          history.push("/posts/:id")
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
          New Post
        </Typography>
        <FormProvider { ...handleSubmit }>
        <form onSubmit = {handleSubmit(handlePostAdder)} className={classes.form}>
          <Controller
            render = {({field}) => (
                <TextField {...field} fullWidth label="Author" required onChange={(e) => field.onChange(e)}
                    value={field.value}/>
            )}
            name="author"
            control={control}
            defaultValue=""
            label="Author"
          />

          <Controller
            render = {({field}) => (
                <TextField {...field} fullWidth label="Link" required onChange={(e) => field.onChange(e)}
                           value={field.value} inputProps={{ maxLength: 100 }}/>
            )}
            name="link"
            control={control}
            defaultValue=""
          />

          <Controller
            render = {({field}) => (
                <TextField {...field} fullWidth label="Description" required onChange={(e) => field.onChange(e)}
                           value={field.value} inputProps={{ maxLength: 300 }}/>
            )}
            name="description"
            control={control}
            defaultValue=""
          />

          <Controller
            render = {({field}) => (
                <Select fullWidth label="Subject" required subjects={subjects} onChange={(e) => field.onChange(e)}>
                  {subjects && subjects.map(subject=>( <option value={subject.value}>{subject.label}</option> ))}
                </Select>
            )}
            name="subject"
            control={control}
          />

          <Controller
            render = {({field}) => (
                <Select fullWidth label="Level" required levels={levels} onChange={(e) => field.onChange(e)}>
                  {levels && levels.map(level=>( <option value={level.value}>{level.label}</option> ))}
                </Select>
            )}
            name="level"
            control={control}
          />

          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Create
          </Button>
        </form>
        </FormProvider>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default PostAdder;