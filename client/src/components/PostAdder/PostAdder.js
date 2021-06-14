import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';
import {useForm, Controller, FormProvider} from "react-hook-form";
import axios from "../../axios.config";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '56vh'
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


const levels = [
  {value: "BE", label: "Beginer"},
  {value: "IN", label: "Intermediate"},
  {value: "AD", label: "Advanced"},
];

const PostAdder = ({user}) => {

  const {handleSubmit, control} = useForm();
  const classes = useStyles();
  const history = useHistory();

  const [subjects, setSubjects] = useState(null)
  const fetchSubjects = () => {
    axios.get(`v1/wishub/subjects/`)
      .then(res => {
        if (res.status === 200) {
          setSubjects(res.data)
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data);
        }
      });
  }

  useEffect(() => {
    fetchSubjects()
  }, [])


  const handlePostAdder = (post) => {

    post['author'] = user.pk

    axios.post('v1/wishub/posts/', post)
      .then(res => {
        if (res.status === 201) {
          history.push(`/posts/${post.subject}`)
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
          var err = document.getElementById("error");

          var message = error.response.data["link"];

          typeof message !== 'undefined' ? err.innerHTML = message : err.innerHTML = "Error";

          err.style.color = "red";
        }
      });

  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <p id="error"></p>
        <Typography component="h1" variant="h5">
          New Post
        </Typography>
        <FormProvider {...handleSubmit}>
          <form onSubmit={handleSubmit(handlePostAdder)} className={classes.form}>

            <Controller
              render={({field}) => (
                <TextField {...field} fullWidth label="Link" required onChange={(e) => field.onChange(e)}
                           value={field.value} inputProps={{maxLength: 100}}/>
              )}
              name="link"
              control={control}
              defaultValue=""
            />

            <Controller
              render={({field}) => (
                <TextField {...field} fullWidth label="Description" required onChange={(e) => field.onChange(e)}
                           value={field.value} inputProps={{maxLength: 300}}/>
              )}
              name="description"
              control={control}
              defaultValue=""
            />

            <Controller
              render={({field}) => (
                <Select fullWidth label="Subject" required subjects={subjects} onChange={(e) => field.onChange(e)}>
                  {subjects && subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>{subject.title}</option>))}
                </Select>
              )}
              name="subject"
              control={control}
            />

            <Controller
              render={({field}) => (
                <Select fullWidth label="Level" required levels={levels} onChange={(e) => field.onChange(e)}>
                  {levels && levels.map(level => (<option value={level.value}>{level.label}</option>))}
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

    </Container>
  );
}

export default PostAdder;