import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import CardContent from '@material-ui/core/CardContent';
import NavigationIcon from '@material-ui/icons/Navigation';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Link from "@material-ui/core/Link";
import {AddComment} from "@material-ui/icons";

const { useState } = React;

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    position: 'relative',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },

  transformation: {
    marginRight: theme.spacing(1),
    transform: 'rotate(180deg)',
  },
  link: {
    color: theme.inherit,
  },
  username: {
    position: 'absolute',
    top: '20px',
    right: '30px',
    color: theme.palette.main,
    textTransform: 'uppercase',
    maxWidth: '300px',
  },
}));

const AddCommentButton = ({ classes, record }) => (
  <Button
    className={classes.button}
    variant="raised"
    component={Link}
    to={`/comments/create?post_id=${record.id}`}
    label="Add a comment"
    title="Add a comment"
  >
    <AddComment />
  </Button>
);

const LinkBox = (props) => {
  let { description, link, author, numDownvoted, numUpvoted } = props.post;
  const [upCount, setUpCount] = useState(numUpvoted);
  const incrementCount = () => {
    setUpCount(upCount + 1);
  };

  const [downCount, setDownCount] = useState(numDownvoted);
  const decrementCount = () => {
    setDownCount(downCount - 1);
  };

  const classes = useStyles();
  // history.push(`post/${post.id}`
  return (
    <div className={classes.root}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <Fab
              variant="extended"
              target={'_blank'}
              href={link}
              className={classes.link}
            >
              {description}
            </Fab>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {link}
          </Typography>
        </CardContent>
        <Button onClick={incrementCount}>
          <NavigationIcon className={classes.extendedIcon} />+{upCount}
        </Button>
        <Button onClick={decrementCount}>
          <NavigationIcon className={classes.transformation} />
          {downCount}
        </Button>
        {/*<Button>*/}
        {/*  <ChatBubbleOutlineIcon className={classes.extendedIcon} />*/}
        {/*  {comments.length}*/}
        {/*</Button>*/}
        <AddCommentButton />
        <Typography className={classes.username} variant="h6">
          {author}
        </Typography>
      </Card>
    </div>
  );
};

export default LinkBox;
