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
//zle importy ->
// import { FormControl, TextField, MenuItem } from "material-ui/core";
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
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

const Subjects = [
  { value: "mathematics", text: "Mathematics" },
  { value: "physics", text: "Physics" },
  { value: "programming", text: "Programming" },
  { value: "computer science", text: "Computer Science" },
];

const Levels = [
  { value: "BE", text: "Beginer" },
  { value: "IN", text: "Intermediate" },
  { value: "AD", text: "Advanced" },
];
//Nie mialas wogole componentu zrobionego
const PostAdder = () => {


  const { handleSubmit, control } = useForm();
  const classes = useStyles();
  const history = useHistory();


  const handlePostAdder = (user) => {


    axios.post('v1/users/auth/post-add/',user)
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
          Register
        </Typography>
        <FormProvider { ...handleSubmit }>
        <form
          onSubmit = {handleSubmit(handlePostAdder)}
          className={classes.form}
        >          <Controller
            render = {({field})=> (
                <TextField {...field}
                    fullWidth
                    label="Author"
                    required
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                />
            )}
            name="author"
            control={control}
            defaultValue=""
            label="Author"
          />
          {/*Skad jest CharField? tego chyba nawet w material-ui nie ma*/}
          {/*<Controller*/}
          {/*  render = {({field})=> (*/}
          {/*      <CharField {...field}*/}
          {/*          fullWidth*/}
          {/*          label="Link"*/}
          {/*          required*/}
          {/*          onChange={(e) => field.onChange(e)}*/}
          {/*          value={field.value}*/}
          {/*          inputProps={{ maxLength: 100 }}*/}
          {/*      />*/}
          {/*  )}*/}
          {/*  name="link"*/}
          {/*  control={control}*/}
          {/*  defaultValue=""*/}
          {/*  label="Link"*/}
          {/*/>*/}

          <Controller
            render = {({field})=> (
                <TextField {...field}
                           fullWidth
                           label="Description"
                           required
                           onChange={(e) => field.onChange(e)}
                           value={field.value}
                           inputProps={{ maxLength: 300 }}
                />
            )}
            name="description"
            control={control}
            defaultValue=""
            />
          {/* Popraw import*/}
          {/* Błąd skladni z Subjects -> czemu nie używasz Select do wybrania jednej wartosci z Subjects? przeciez po to jest*/}
          <FormControl>
              <TextField
                select
                label="Choose one subject"
                id="subject"

                // inputProps={{
                //   inputRef: (ref) => {
                //     if (!ref) return;
                //     Subjects({
                //       name: "Subjects",
                //       value: ref.value,
                //     });
                //   },
                // }}
              >
              {Subjects.map((subject) => (
                    <MenuItem key={subject.value} value={subject.value}>
                          {subject.text}
                    </MenuItem>
                ))}
              </TextField>
          </FormControl>
{/* Popraw import*/}
          {/* Błąd skladni z Level -> czemu nie używasz Select do wybrania jednej wartosci z Subjects? przeciez po to jest*/}
          <FormControl>
              <TextField
                select
                label="Choose the level"
                id="lvl"
                // inputProps={{
                //   inputRef: (ref) => {
                //     if (!ref) return;
                //     Level({
                //       name: "Level",
                //       value: ref.value,
                //     });
                //   },
                // }}
              >
              {Levels.map((level) => (
                    <MenuItem key={level.value} value={level.value}>
                          {level.text}
                    </MenuItem>
                ))}
              </TextField>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
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
