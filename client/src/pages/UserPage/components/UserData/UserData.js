import React, {} from 'react';
import {Card, CardContent, Typography} from "@material-ui/core";


const UserData = ({user}) => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {user.username}
        </Typography>
        <Typography variant="h5" component="h2">
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body2" component="p">
          {user.email}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserData;