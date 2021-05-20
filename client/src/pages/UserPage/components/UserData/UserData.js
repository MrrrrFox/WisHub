import React, {} from 'react';
import {Card, CardActions} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";



const UserData = ({user}) => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {user.username}
        </Typography>
        <Typography variant="h5" component="h2">
          Michał Kacprzak
          {/*{user.firstname}*/}  {/*{user.secondname}*/}
        </Typography>
        <Typography variant="body2" component="p">
          {user.email}
        </Typography>
      </CardContent>
      {/*<CardActions>*/}
      {/*  <Button size="small">Edit</Button>*/}
      {/*</CardActions>*/}
    </Card>
  );
};

export default UserData;