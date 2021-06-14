import React from 'react';
import blank from '../../../../assets/images/blank.png'
import {Avatar, Grid, Paper} from "@material-ui/core";


const Comment = ({comment}) => {

  const {author, body, createdDate} = comment;

  const postedAgo = () => {
    const currentDate = new Date()
    const delta = Math.abs(new Date(Date.parse(createdDate)) - currentDate) / 1000;
    return Math.floor(delta / 60) % 60
  }

  return (

      <Paper style={{padding: "40px 20px", marginTop: 20}}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar aria-label="recipe" alt={`${author.username} profile image`} src={blank}/>
          </Grid>
          <Grid item xs zeroMinWidth>
            <h4 style={{margin: 0, textAlign: "left"}}>{author.username}</h4>
            <p style={{textAlign: "left"}}>
              {body}
            </p>
            <p style={{textAlign: "left", color: "gray"}}>
              {`posted ${postedAgo()} minute ago`}
            </p>
          </Grid>
        </Grid>
      </Paper>


  );
};

export default Comment;