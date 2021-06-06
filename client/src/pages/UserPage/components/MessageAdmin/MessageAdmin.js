import React from 'react';
import {TextField} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useForm, Controller, FormProvider } from "react-hook-form";
import axios from "../../../../axios.config";
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';

const MessageAdmin = () => {
  const { handleSubmit, control, reset } = useForm();

  // TODO add proper endpoint
  const handleSendingMessage = (data) => {
    axios.post(`v1/wishub/admin-message/`, data)
      .then(res => {
        if(res.status === 200){
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
        >
          <Controller
            render = {({field})=> (
                <TextField {...field}
                           fullWidth
                           multiline
                           rows={5}
                           rowsMax={10}
                           variant={"outlined"}
                           label="Type your message here"
                           required
                           value={field.value}
                />
            )}
            name="message"
            control={control}
            defaultValue=""
          />


          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
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