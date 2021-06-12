import React from 'react';
import {LinkBox} from '../../../../../../components'
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from "../../../../../../axios.config";
import {PostEditDialog} from './components'

const UserPost = ({post, fetchUserPosts, votes,user}) => {
  const [open, setOpen] = React.useState(false);
  const deletePost = () => {
    axios.delete(`v1/wishub/posts/${post.id}`)
      .then(res => {
        if (res.status) {
          fetchUserPosts()
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        }
      });
  }
  const editPost = () => {
    setOpen(true)
  }
  return (
    <Grid
      item
      container
      id="postsList"
      alignItems={"center"}
      spacing={1}
    >

      <Grid item >
        <LinkBox key={post.id} post={post} user={user} votes={votes}/>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon/>}
          onClick={() => deletePost()}
        >
          Delete
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="default"
          startIcon={<EditIcon/>}
          onClick={() => editPost()}
        >

          Edit
        </Button>
      </Grid>
      <PostEditDialog open={open} setOpen={setOpen} post={post} fetchUserPosts={fetchUserPosts}/>
    </Grid>
  )
    ;
};

export default UserPost;