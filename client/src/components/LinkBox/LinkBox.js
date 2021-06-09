import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import CardContent from '@material-ui/core/CardContent';
import NavigationIcon from '@material-ui/icons/Navigation';
import axios from "../../axios.config";

const { useState, useEffect } = React;

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
    maxWidth: '300px',
    fontSize: '15px',
    textAlign: "end"
  },
  level: {
    fontSize: '15px'
  }
}));

const LinkBox = (props) => {
  let { id, description, link, author, numDownvoted, numUpvoted ,level, created } = props.post;
  let user = props.user;
  let votes = props.votes;
  const [upCount, setUpCount] = useState(numUpvoted);
  const [downCount, setDownCount] = useState(numDownvoted);
  const [colorVote, setColorVote] = useState('black');
  const idx = created.indexOf('T');
  var date = created.substr(0, idx) + ", " + created.substr(idx + 1, 5);

  const votePost = (val) => {
    const vote = {
      "user_id" : user["pk"],
      "vote_type": val
    }

    axios.post(`v1/wishub/posts/${id}/vote-post/`, vote)
      .then(res => {
        if(res.status === 200){
          val === 'up' ? setUpCount(upCount + 1) : setDownCount(downCount + 1);
          val === 'up' ? votes[id] = 'up' : votes[id] = 'down';
        }
      })
      .catch((error) => {
        if( error.response ){
          console.log(error.response.data); // => the response payload
          }
      });
  };

  const incrementCount = () => {
    if(user !== null){
      const vote = {
      "user_id" : user["pk"]
    }

    axios.post(`v1/wishub/posts/${id}/check-votes/`, vote)
      .then(res => {
        if(res.status === 200){
            var voteVal = res.data;
            if(voteVal['voteType']) {
              const unvote = {
                "user_id" : user["pk"]
              }
          
              axios.post(`v1/wishub/posts/${id}/unvote-post/`, unvote)
                .then(res => {
                  if(res.status === 200){
                    if(voteVal['voteType'] === 'up') {
                      setUpCount(upCount - 1);
                      votes[id] = 'none';
                    }
                    else {
                      setDownCount(downCount - 1);
                      votePost('up');
                    }
                  }
                })
                .catch((error) => {
                  if( error.response ){
                    console.log(error.response.data);
                    }
                });
            }
            if(voteVal['errorMessage']) {
              votePost('up');
            }
        }
      })
      .catch((error) => {
        if( error.response ){
          console.log(error.response.data);
          }
      });
    
    }
  };

  const decrementCount = () => {
    if(user !== null){
      const vote = {
      "user_id" : user["pk"]
    }

    axios.post(`v1/wishub/posts/${id}/check-votes/`, vote)
      .then(res => {
        if(res.status === 200){
            var voteVal = res.data;
            if(voteVal['voteType']) {
              const unvote = {
                "user_id" : user["pk"]
              }
          
              axios.post(`v1/wishub/posts/${id}/unvote-post/`, unvote)
                .then(res => {
                  if(res.status === 200){
                    if(voteVal['voteType'] === 'down') {
                      setDownCount(downCount - 1);
                      votes[id] = 'none';
                    }
                    else {
                      setUpCount(upCount - 1);
                      votePost('down');
                    }
                  }
                })
                .catch((error) => {
                  if( error.response ){
                    console.log(error.response.data);
                    }
                });
            }
            if(voteVal['errorMessage']) {
              votePost('down');
            }
        }
      })
      .catch((error) => {
        if( error.response ){
          console.log(error.response.data);
          }
      });
    
    }
  };

  const classes = useStyles();
  useEffect(() => {
    votes[id] === 'up' ? setColorVote('green') : votes[id] === 'down' ? setColorVote('red') : setColorVote('black');
  });

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
        <Typography className={classes.username} variant="h6">
          {author.username}
          <br/>
          {date}
        </Typography>
      </Card>
    </div>
  );
};

export default LinkBox;
