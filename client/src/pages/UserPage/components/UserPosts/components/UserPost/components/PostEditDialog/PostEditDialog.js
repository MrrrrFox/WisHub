import React, { useState, useEffect} from 'react';
import axios from "../../../../../../../../axios.config";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useForm, Controller, FormProvider } from "react-hook-form";
import Select from "@material-ui/core/Select";


const levels = [
  { value: "BE", label: "Beginer" },
  { value: "IN", label: "Intermediate" },
  { value: "AD", label: "Advanced" },
];



const PostEditDialog = ({open, setOpen, post, fetchUserPosts}) => {
  const { handleSubmit, control } = useForm({
    defaultValues: post
  });

  const [subjects, setSubjects] = useState(null)
  const fetchSubjects = () => {
    axios.get(`v1/wishub/subjects/`)
      .then(res => {
        if(res.status === 200){
          setSubjects(res.data)
        }
      })
      .catch((error) => {
        if( error.response ){
          console.error(error.response.data);
          }
      });
  }

  useEffect(() => {
    fetchSubjects()
  }, [])


  const handleEdit = (data) => {

    axios.put(`v1/wishub/posts/${data.id}/`, data)
      .then(res => {
        if(res.status){
          fetchUserPosts()
        }
      }).then(() => setOpen(false))
      .catch((error) => {
        if( error.response ){
          console.error(error.response.data); // => the response payload
          }
      });
  }


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle id="form-dialog-title">Edit Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can edit your post
          </DialogContentText>

          <FormProvider { ...handleSubmit }>

        <form onSubmit = {handleSubmit(handleEdit)} >
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
                <Select fullWidth defaultValue={post.subject}  label="Subject" required subjects={subjects} onChange={(e) => field.onChange(e)}>
                  {subjects && subjects.map(subject=>( <option key={subject.id} value={subject.id}>{subject.title}</option> ))}
                </Select>
            )}
            name="subject"
            control={control}
          />

          <Controller
            render = {({field}) => (
                <Select defaultValue={post.level}  fullWidth label="Level" required levels={levels} onChange={(e) => field.onChange(e)}>
                  {levels && levels.map(level=>( <option value={level.value}>{level.label}</option> ))}
                </Select>
            )}
            name="level"
            control={control}
          />
          {/*TODO className={classes.submit}*/}
          {/*<Button type="submit" fullWidth variant="contained" color="primary" >*/}
          {/*  Create*/}
          {/*</Button>*/}

        <DialogActions>
          <Button  onClick={() => handleClose()} color="primary">
            Cancel
          </Button>
          <Button type="submit"  color="primary">
            Edit
          </Button>
        </DialogActions>
                  </form>
        </FormProvider>
        </DialogContent>
    </Dialog>
  );
};

export default PostEditDialog;