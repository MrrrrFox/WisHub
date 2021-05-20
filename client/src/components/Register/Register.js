import React, { useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { useForm, Controller, FormProvider } from "react-hook-form";
import axios from "../../axios.config";
import Avatar from '@material-ui/core/Avatar';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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

const Register = () => {
  const { handleSubmit, control } = useForm();
  const classes = useStyles();
  const history = useHistory();


  const handleRegister = (user) => {


    axios.post('v1/users/auth/register/',user)
      .then(res => {
        if(res.status === 201){
          history.push("/signin")
        }
      })
      .catch((error) => {
        if( error.response ){
          console.log(error.response.data); // => the response payload
          var err = document.getElementById("error");

          var username = error.response.data["username"];
          var email = error.response.data["email"];
          var pass = error.response.data["password1"];
          var message = error.response.data["nonFieldErrors"];

          typeof username !== 'undefined' ? err.innerHTML = username : 
          typeof email !== 'undefined' ? err.innerHTML = email :
          typeof pass !== 'undefined' ? err.innerHTML = pass :
          typeof message !== 'undefined' ? err.innerHTML = message : err.innerHTML = "";

          err.style.color = "red";
          }
      });

  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <p id="error"></p>
        <Avatar className={classes.avatar}>
          <AddCircleOutlineIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <FormProvider { ...handleSubmit }>
        <form
          onSubmit = {handleSubmit(handleRegister)}
          className={classes.form}
        >          <Controller
            render = {({field})=> (
                <TextField {...field}
                    fullWidth
                    label="User Name"
                    required
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                />
            )}
            name="username"
            control={control}
            defaultValue=""
            label="User Name"
          />
          <Controller
            render = {({field})=> (
                <TextField {...field}
                    fullWidth
                    label="Email Address"
                    required
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                />
            )}
            name="email"
            control={control}
            defaultValue=""
            label="Email Address"
          />

          <Controller
            render = {({field})=> (
                <TextField {...field}
                           fullWidth
                           label="Password"
                           type="password"
                           required
                           onChange={(e) => field.onChange(e)}
                           value={field.value}
                           inputProps={{ minLength: 8 }}
                />
            )}
            name="password1"
            control={control}
            defaultValue=""
            />
            <Controller
            render = {({field})=> (
                <TextField {...field}
                           fullWidth
                           label="Confirm Password"
                           type="password"
                           required
                           onChange={(e) => field.onChange(e)}
                           value={field.value}
                           inputProps={{ minLength: 8 }}
                />
            )}
            name="password2"
            control={control}
            defaultValue=""
            />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
        </FormProvider>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Register;