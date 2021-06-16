import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';
import {useForm, Controller, FormProvider} from "react-hook-form";
import axios from "../../axios.config";
import Avatar from '@material-ui/core/Avatar';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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
  const {handleSubmit, control} = useForm();
  const classes = useStyles();
  const history = useHistory();


  const handleRegister = (user) => {


    axios.post('v1/users/auth/register/', user)
      .then(res => {
        if (res.status === 201) {
          const config = {headers: {'Authorization': `Token ${res.data.key}`}}
          const data = {username: user.username,lastName: user.lastName, firstName: user.firstName}
          return axios.put('v1/users/auth/user/',data , config)
        }
      })
      .then(res => {
        if (res.status === 200) {
          history.push("/signin")
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
          const err = document.getElementById("error");

          const username = error.response.data["username"];
          const email = error.response.data["email"];
          const pass = error.response.data["password1"];
          const message = error.response.data["nonFieldErrors"];

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
      <CssBaseline/>
      <div className={classes.paper}>
        <p id="error"></p>
        <Avatar className={classes.avatar}>
          <AddCircleOutlineIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <FormProvider {...handleSubmit}>
          <form
            onSubmit={handleSubmit(handleRegister)}
            className={classes.form}
          >
            <Controller
              render={({field}) => (
                <TextField {...field}
                           fullWidth
                           label="First Name"
                           required
                           onChange={(e) => field.onChange(e)}
                           value={field.value}
                />
              )}
              name="firstName"
              control={control}
              defaultValue=""
              label="First Name"
            />
            <Controller
              render={({field}) => (
                <TextField {...field}
                           fullWidth
                           label="Last Name"
                           required
                           onChange={(e) => field.onChange(e)}
                           value={field.value}
                />
              )}
              name="lastName"
              control={control}
              defaultValue=""
              label="Last Name"
            />
            <Controller
              render={({field}) => (
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
              render={({field}) => (
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
              render={({field}) => (
                <TextField {...field}
                           fullWidth
                           label="Password"
                           type="password"
                           required
                           onChange={(e) => field.onChange(e)}
                           value={field.value}
                           inputProps={{minLength: 8}}
                />
              )}
              name="password1"
              control={control}
              defaultValue=""
            />
            <Controller
              render={({field}) => (
                <TextField {...field}
                           fullWidth
                           label="Confirm Password"
                           type="password"
                           required
                           onChange={(e) => field.onChange(e)}
                           value={field.value}
                           inputProps={{minLength: 8}}
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
    </Container>
  );
};

export default Register;
