import React, {useState, useEffect} from 'react';

import Typography from '@material-ui/core/Typography';
import {Button, Dialog, DialogTitle, InputLabel, MenuItem, FormControl, Select} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinkIcon from '@material-ui/icons/Link';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import axios from "../../axios.config";
import blank from '../../assets/images/blank.png'
import ReportIcon from '@material-ui/icons/Report';
import {AddComment} from "@material-ui/icons";
import {useHistory} from 'react-router-dom'


const LinkBox = ({user = null, post, votes = {}, setVotes}) => {

  const {id, description, link, author, numDownvoted, numUpvoted, level, created} = post;

  const history = useHistory()
  const [upCount, setUpCount] = useState(numUpvoted);
  const [downCount, setDownCount] = useState(numDownvoted);
  const [colorVote, setColorVote] = useState('black');
  const idx = created.indexOf('T');
  const date = created.substr(0, idx) + ", " + created.substr(idx + 1, 5);
  const [authorAvatar, setAuthorAvatar] = useState(blank)

  const getAuthorAvatar = () => {
    axios.get(`v1/wishub/users/${author.id}/avatar`)
      .then(res => {
        if (res.status === 200) {
          setAuthorAvatar(`data:image/png;base64,${res.data.avatar}`);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
        }
      });
  }


  const votePost = (val) => {
    const vote = {
      "user_id": user["pk"],
      "vote_type": val
    }

    axios.post(`v1/wishub/posts/${id}/vote-post/`, vote)
      .then(res => {
        if (res.status === 200) {
          val === 'up' ? setUpCount(upCount + 1) : setDownCount(downCount + 1);
          val === 'up' ? votes[id] = 'up' : votes[id] = 'down';
          setVotes(votes)
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
        }
      });
  };

  const incrementCount = () => {

    if (user !== null) {
      const vote = {
        "user_id": user["pk"]
      }

      axios.post(`v1/wishub/posts/${id}/check-votes/`, vote)
        .then(res => {
          if (res.status === 200) {
            const voteVal = res.data;
            if (voteVal['voteType']) {
              const unvote = {
                "user_id": user["pk"]
              }

              axios.post(`v1/wishub/posts/${id}/unvote-post/`, unvote)
                .then(res => {
                  if (res.status === 200) {
                    if (voteVal['voteType'] === 'up') {
                      setUpCount(upCount - 1);
                      votes[id] = 'none';
                      setVotes(votes)
                    } else {
                      setDownCount(downCount - 1);
                      votePost('up');
                    }
                  }
                })
                .catch((error) => {
                  if (error.response) {
                    console.error(error.response.data);
                  }
                });
            }
            if (voteVal['errorMessage']) {
              votePost('up');
            }
          }
        })
        .catch((error) => {
          if (error.response) {
            console.error(error.response.data);
          }
        });

    }
  };

  const decrementCount = () => {
    if (user !== null) {
      const vote = {
        "user_id": user["pk"]
      }

      axios.post(`v1/wishub/posts/${id}/check-votes/`, vote)
        .then(res => {
          if (res.status === 200) {
            const voteVal = res.data;
            if (voteVal['voteType']) {
              const unvote = {
                "user_id": user["pk"]
              }

              axios.post(`v1/wishub/posts/${id}/unvote-post/`, unvote)
                .then(res => {
                  if (res.status === 200) {
                    if (voteVal['voteType'] === 'down') {
                      setDownCount(downCount - 1);
                      votes[id] = 'none';
                      setVotes(votes)
                    } else {
                      setUpCount(upCount - 1);
                      votePost('down');
                    }
                  }
                })
                .catch((error) => {
                  if (error.response) {
                    console.error(error.response.data);
                  }
                });
            }
            if (voteVal['errorMessage']) {
              votePost('down');
            }
          }
        })
        .catch((error) => {
          if (error.response) {
            console.error(error.response.data);
          }
        });

    }
  };


  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const showDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const whyReport = (e) => {
    setValue(e.target.value);
  };

  const report = () => {
    const data = {'message': value};
    const config = {headers: {'Authorization': `Token ${localStorage.getItem('isLogged')}`}}
    axios.post(`v1/wishub/posts/${id}/report-post/`, data, config)
      .then(res => {
        if (res.status === 200) {
          console.info('reported');
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data);
        }
      });
    setOpen(false);
  };

  useEffect(() => {
    votes[id] === 'up' ? setColorVote('green') : votes[id] === 'down' ? setColorVote('red') : setColorVote('black');
  },);

  useEffect(() => {
    getAuthorAvatar()
  }, [])


  return (
    <>
      <Card>
        <CardHeader
          avatar={
            //TODO alter with user profile image
            <Avatar
              aria-label="recipe"
              alt={`${author.username} profile image`}
              src={authorAvatar
              }/>
          }
          style={{textAlign: 'end'}}
          title={author.username}
          subheader={date}
        />
        <CardContent>
          <Typography>
            Level: {level === "BE" ? "Beginner" : level === "IN" ? "Intermediate" : "Advanced"}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}

          </Typography>
        </CardContent>
        <CardActions>

          <Button aria-label="share" target={'_blank'} href={link}>
            <LinkIcon style={{color: 'blue'}}/>
          </Button>
          <Button onClick={incrementCount}>
            <ThumbUpIcon
              style={{color: colorVote === 'red' ? 'black' : colorVote}}/>+{upCount}
          </Button>
          <Button onClick={decrementCount}>
            <ThumbDownIcon
              style={{color: colorVote === 'green' ? 'black' : colorVote}}/>
            -{downCount}
          </Button>

          <Button onClick={() => history.push(`/post/${id}`)}>
            <AddComment/>
          </Button>
          <Button onClick={showDialog}>
            <ReportIcon
              style={{color: 'red'}}
            />
          </Button>
        </CardActions>
      </Card>
      <Dialog onClose={closeDialog} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Why you want to report this post?</DialogTitle>
        <FormControl>
          <InputLabel>Why</InputLabel>
          <Select onChange={whyReport}>
            <MenuItem value="spam">Spam</MenuItem>
            <MenuItem value="false">False info</MenuItem>
            <MenuItem value="notValid">Link is not valid</MenuItem>
          </Select>
          <Button
            variant="contained"
            color="primary"
            onClick={report}>
            Report
          </Button>
        </FormControl>
      </Dialog>
    </>
  );
};

export default LinkBox;
