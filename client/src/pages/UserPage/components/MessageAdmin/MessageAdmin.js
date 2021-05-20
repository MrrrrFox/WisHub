import React, { useState} from 'react';
import {TextField} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useForm, Controller, FormProvider } from "react-hook-form";
import axios from "../../../../axios.config";
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';

const MessageAdmin = () => {
  const { handleSubmit, control, reset } = useForm();
  const [errors, setErrors] = useState(false);
  // TODO add proper endpoint
  const handleSendingMessage = (data) => {
    axios.post(`v1/wishub/admin-message/`, data)
      .then(res => {
        if(res.status === 200){
          console.log(res.data)
          reset()
        }
      })
      .catch((error) => {
        if( error.response ){
          console.log(error.response.data); // => the response payload
          }
      });
  }
  return (
    <Container component="main" maxWidth="xs">

      <Typography component="h1" variant="h5">
          Send message to administration
      </Typography>
        <FormProvider { ...handleSubmit }>
        <form
          onSubmit = {handleSubmit(handleSendingMessage)}
          // className={classes.form}
        >
          <Controller
            render = {({field})=> (
                <TextField {...field}
                           fullWidth
                           multiline
                           rows={5}
                           rowsMax={10}
                           label="Type your message here"
                           required
                           value={field.value}
                />
            )}
            name="message"
            control={control}
            defaultValue=""
            // label="Email Address"
          />


          <Button
            type="submit"
            fullWidth
            // variant="contained"
            // color="primary"
            // className={classes.submit}
            variant="contained"
            color="primary"
        // className={classes.button}
            endIcon={<SendIcon />}
          >
            Send
          </Button>

        </form>
        </FormProvider>

    </Container>
  );
};

export default MessageAdmin;