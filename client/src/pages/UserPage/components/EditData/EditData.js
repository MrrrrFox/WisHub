import React, {useState, useEffect} from 'react';
import axios from "../../../../axios.config";

import {Container, Grid} from "@material-ui/core";
import {useForm, Controller, FormProvider} from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

const EditData = ({user}) => {
  const {handleSubmit, control} = useForm({
      defaultValues: user
    }
  );

  console.log(user)

  const handleEdit = (data) => {
    console.log(data)
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
                name="firstname"
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
                name="lastname"
                control={control}
                defaultValue=""
                label="Last name"
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary"/>}
                label="Remember me"
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