import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import CardContent from '@material-ui/core/CardContent';
import NavigationIcon from '@material-ui/icons/Navigation';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import axios from "../../axios.config";

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
    fontSize: '15px'
  },
  level: {
    fontSize: '15px'
  }
}));

const LinkBox = (props) => {
  let { id, description, link, author, numDownvoted, numUpvoted ,level, created } = props.post;
  let user = props.user;
  const [upCount, setUpCount] = useState(numUpvoted);
  const [colorVote, setColorVote] = useState('black');
  const idx = created.indexOf('T');
  var date = created.substr(0, idx) + ", " + created.substr(idx + 1, 5);

  const incrementCount = () => {
    /*colorVote === 'green' ? setUpCount(upCount - 1) : setUpCount(upCount + 1);
    if(colorVote === 'red')
      setDownCount(downCount - 1);
    colorVote === 'green' ? setColorVote('black') : setColorVote('green');
    //style={{ color: colorVote === 'red' ? 'black' : colorVote }}*/
    if(user !== null){
      const vote = {
      "user_id" : user["pk"],
      "vote_type": "up"
    }

    axios.post(`v1/wishub/posts/${id}/vote-post/`, vote)
      .then(res => {
        if(res.status === 200){

          setUpCount(upCount + 1);
          setColorVote('green');
        }
      })
      .catch((error) => {
        if( error.response ){
          console.log(error.response.data); // => the response payload
          }
      });
    }

  };

  const [downCount, setDownCount] = useState(numDownvoted);
  const decrementCount = () => {
    /*setDownCount(downCount - 1);
    colorVote === 'red' ? setDownCount(downCount - 1) : setDownCount(downCount + 1);
    if(colorVote === 'green')
      setUpCount(upCount - 1);
    colorVote === 'red' ? setColorVote('black') : setColorVote('red');*/
    if(user!==null){
      const vote = {
      "user_id" : user["pk"],
      "vote_type": "down"
    }

    axios.post(`v1/wishub/posts/${id}/vote-post/`, vote)
      .then(res => {
        if(res.status === 200){

          setDownCount(downCount + 1);
          setColorVote('red');
        }
      })
      .catch((error) => {
        if( error.response ){
          console.log(error.response.data); // => the response payload
          }
      });
    }

  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card>
        <CardContent>
          <Typography className={classes.level}>
            Level: {level === "BE" ? "Beginner" : level === "IN" ? "Intermediate" : "Advanced"}
          </Typography>
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
          <NavigationIcon className={classes.extendedIcon} style={{ color: colorVote === 'red' ? 'black' : colorVote }} />+{upCount}
        </Button>
        <Button onClick={decrementCount}>
          <NavigationIcon className={classes.transformation} style={{ color: colorVote === 'green' ? 'black' : colorVote }} />
          -{downCount}
        </Button>
        {/*<Button>*/}
        {/*  <ChatBubbleOutlineIcon className={classes.extendedIcon} />*/}
        {/*  {comments.length}*/}
        {/*</Button>*/}
        <Typography className={classes.username} variant="h6">
          {author}
          <br/>
          {date}
        </Typography>
      </Card>
    </div>
  );
};

export default LinkBox;
