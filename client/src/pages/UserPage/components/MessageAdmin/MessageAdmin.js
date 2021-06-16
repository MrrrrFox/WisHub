import React from 'react';
import {TextField} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useForm, Controller, FormProvider } from "react-hook-form";
import axios from "../../../../axios.config";
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';

const MessageAdmin = () => {
  const { handleSubmit, control, setValue} = useForm();

  // TODO add proper endpoint
  const handleSendingMessage = (data) => {
    const config = {headers: {'Authorization': `Token ${localStorage.getItem('isLogged')}`}}
    axios.post(`v1/wishub/contact-admin/`, data, config)
      .then(res => {
        console.log(res.status)
        if(res.status === 200){
          setValue('message', '')
        }
      })
      .catch((error) => {
        if( error.response ){
          console.error(error.response.data); // => the response payload
          }
      });
  }
  return (
    <Container component="main" maxWidth="xs">

      <Typography component="h1" variant="h5">
          Send message to administration
      </Typography>
        <FormProvider { ...handleSubmit }>
        <form onSubmit = {handleSubmit(handleSendingMessage)}>
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
                           onChange={(e) => field.onChange(e)}
                           value={field.value}
                           inputProps={{maxLength: 300}}
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