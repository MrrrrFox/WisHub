import React, {useState, useEffect} from 'react';
import axios from "../../../../axios.config";
import {UserPost} from './components'
import {Grid} from "@material-ui/core";

const UserPosts = ({user}) => {
  const [userPosts, setUserPosts] = useState(null)
  const [votes, setVotes] = useState({})

  const fetchUserPosts = () => {

    axios.get(`v1/wishub/posts/${user.pk}/by-author`)
      .then(res => {
        if (res.status === 200) {
          setUserPosts(res.data)
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
        }
      });
  }

  const fetchVotes = () => {
    const config = {headers: {'Authorization': `Token ${localStorage.getItem('isLogged')}`}}
    axios.get(`v1/wishub/user-voted-posts`, config)
      .then(res => {
        if (res.status === 200) {
          setVotes(res.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data);
        }
      });
  }
  useEffect(() => {
    fetchUserPosts();
    fetchVotes();
  }, []);
  return (
    <Grid
      container
      id="postsList"
      justify="flex-start"
      item xs={12}
      alignContent={"center"}
      direction={"column"}
      spacing={1}
    >
      {userPosts != null
        ? userPosts.map((post) =>
          <Grid key={post.id} item>
            <UserPost key={post.id} user={user} post={post} fetchUserPosts={fetchUserPosts} votes={votes}/></Grid>
        ) : null
      }
    </Grid>
  );
};

export default UserPosts;