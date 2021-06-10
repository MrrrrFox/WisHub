import React from 'react';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Divider, List, ListItem, ListItemText} from "@material-ui/core";


const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        WisHub
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Comment = ({ comments }) => {
  const classes = useStyles();
  return (
    <List className={classes.main}>
      {comments.map(comment => {
        console.log("Comment", comment);
        return (
          <React.Fragment key={comment.id}>
            <ListItem key={comment.id} alignItems="flex-start">
              {/*<ListItemAvatar>*/}
              {/*  <Avatar alt="avatar" src={Faker.image.avatar()} />*/}
              {/*</ListItemAvatar>*/}
              <ListItemText
                primary={
                  <Typography className={classes.fonts}>
                    {comment.post}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {comment.author}
                    </Typography>
                    {` - ${comment.body}`}
                  </>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        );
      })}
      <Box mt={8}>
        <Copyright />
      </Box>
    </List>
  );
};

export default Comment;