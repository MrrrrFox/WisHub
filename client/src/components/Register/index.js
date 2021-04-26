import React from "react";
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
import { useForm, Controller, FormProvider, useFormContext } from "react-hook-form";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

function Copyright() {
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

const RegisterForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const handleRegistration = (data) => console.log(data);
  const handleError = (errors) => {};
  const registerOptions = {
    name: { required: "Name is required" },
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters"
      }
    }
  };
  return (
    <Form onSubmit={handleSubmit(handleRegistration, handleError)}>
      <FormGroup>
        <Label>Name</Label>
        <Input name="name" innerRef={register(registerOptions.name)} />
        <small className="text-danger">
          {errors.name && errors.name.message}
        </small>
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          innerRef={register(registerOptions.email)}
        />
        <small className="text-danger">
          {errors.email && errors.email.message}
        </small>
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          innerRef={register(registerOptions.password)}
        />
        <small className="text-danger">
          {errors.password && errors.password.message}
        </small>
      </FormGroup>
      <Button color="primary">Submit</Button>
    </Form>
  );
};
export default RegisterForm;