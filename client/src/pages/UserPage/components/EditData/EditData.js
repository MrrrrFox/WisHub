import React from 'react';
import axios from "../../../../axios.config";

import {Container, Grid} from "@material-ui/core";
import {useForm, Controller, FormProvider} from "react-hook-form";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";


const EditData = ({user}) => {
  const {handleSubmit, control} = useForm({
      defaultValues: user
    }
  );

  const handleEdit = (data) => {
    console.log(data)
    axios.put('v1/users/auth/user/',data,{headers:{'Authorization': `Token ${localStorage.getItem('isLogged')}`}})
      .then(res => {
        if(res.status === 200){
          console.log(res.data)
        }
      })
      .catch((error) => {
        if( error.response ){
          console.log(error.response);
          }
      });
  }
  return (
    <Container>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        <Grid item xs={8}>
          <FormProvider {...handleSubmit}>
            <form
              onSubmit={handleSubmit(handleEdit)}
            >
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
                             label="First name"
                             required
                             onChange={(e) => field.onChange(e)}
                             value={field.value}
                  />
                )}
                name="firstName"
                control={control}
                defaultValue=""
                label="First name"
              />
              <Controller
                render={({field}) => (
                  <TextField {...field}
                             fullWidth
                             label="Last name"
                             required
                             onChange={(e) => field.onChange(e)}
                             value={field.value}
                  />
                )}
                name="lastName"
                control={control}
                defaultValue=""
                label="Last name"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color={"primary"}
              >
                Edit
              </Button>

            </form>
          </FormProvider>
        </Grid>
      </Grid>

    </Container>
  );
};

export default EditData;