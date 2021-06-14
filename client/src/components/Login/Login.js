import React, { useState, useEffect} from 'react'; 
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
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

const SignIn = () => {
  const { handleSubmit, control } = useForm();
  const classes = useStyles();
  const history = useHistory();

  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('isLogged') !== null) {
        history.push("/");
    } else {
      setLoading(false);
    }
  }, []);
  
  const handleLogin = (user) => {
    axios.post('v1/users/auth/login/',user)
      .then(res => {
        if(res.status === 200){
          localStorage.setItem('isLogged', res.data.key);
          window.dispatchEvent( new Event('storage') );
          history.push("/")
        }
      })
      .catch((error) => {
        if( error.response ){
          console.error(error.response.data);
          var err = document.getElementById("error");
          
          var email = error.response.data["email"];
          var message = error.response.data["nonFieldErrors"];

          typeof email !== 'undefined' ? err.innerHTML = email :
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <FormProvider { ...handleSubmit }>
        <form
          onSubmit = {handleSubmit(handleLogin)}
          className={classes.form}
        >
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
                />
            )}
            name="password"
            control={control}
            defaultValue=""
            />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
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
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        </FormProvider>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignIn;
