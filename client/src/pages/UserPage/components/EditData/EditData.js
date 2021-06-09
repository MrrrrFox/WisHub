import React from 'react';
import axios from "../../../../axios.config";

import {Grid} from "@material-ui/core";
import {useForm, Controller, FormProvider} from "react-hook-form";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";


const EditData = ({user, getUser}) => {
  const {handleSubmit, control, reset} = useForm({
      defaultValues: user
    }
  );

  const handleEdit = (data) => {
    const config = {headers: {'Authorization': `Token ${localStorage.getItem('isLogged')}`}}

    axios.put('v1/users/auth/user/', data, config)
      .then(res => {
        if (res.status === 200) {
          getUser()

        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  }
  const handleEditPassword = (data) => {
    const config = {headers: {'Authorization': `Token ${localStorage.getItem('isLogged')}`}}

    axios.post('v1/users/auth/password/change/', data, config)
      .then(res => {
        if (res.status === 200) {
          reset()
        }
      })
      .catch((error) => {
        if (error.response) {
          reset()
        }
      });
  }

  return (

    <Grid
      item
      container
      justify="center"
      spacing={3}
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
                           label="Username"
                           required
                           onChange={(e) => field.onChange(e)}
                           value={field.value}
                />
              )}
              name="username"
              control={control}
              defaultValue=""
              label="Username"
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
      <Grid item xs={8}>
        <FormProvider {...handleSubmit}>
          <form
            onSubmit={handleSubmit(handleEditPassword)}
          >
            <Controller
              render={({field}) => (
                <TextField {...field}
                           fullWidth
                           label="Old Password"
                           type="password"
                           required
                           onChange={(e) => field.onChange(e)}
                           value={field.value}
                           inputProps={{minLength: 8}}
                />
              )}
              name="oldPassword"
              control={control}
              defaultValue=""
            />
            <Controller
              render={({field}) => (
                <TextField {...field}
                           fullWidth
                           label="New password"
                           type="password"
                           required
                           onChange={(e) => field.onChange(e)}
                           value={field.value}
                           inputProps={{minLength: 8}}
                />
              )}
              name="newPassword1"
              control={control}
              defaultValue=""
            />
            <Controller
              render={({field}) => (
                <TextField {...field}
                           fullWidth
                           label="Confirm New Password"
                           type="password"
                           required
                           onChange={(e) => field.onChange(e)}
                           value={field.value}
                           inputProps={{minLength: 8}}
                />
              )}
              name="newPassword2"
              control={control}
              defaultValue=""
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
  );
};

export default EditData;