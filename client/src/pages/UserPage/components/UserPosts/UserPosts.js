import React, { useState, useEffect} from 'react';
import axios from "../../../../axios.config";
// import {LinkBox} from '../../../../components'
import {UserPost} from './components'
import {Grid} from "@material-ui/core";

const UserPosts = ({userId}) => {
  const [userPosts, setUserPosts] = useState(null)
  const fetchUserPosts = () => {
    axios.get(`v1/wishub/posts/${userId}/by-author`)
      .then(res => {
        if(res.status === 200){
          setUserPosts(res.data)
        }
      })
      .catch((error) => {
        if( error.response ){
          console.log(error.response.data); // => the response payload
          }
      });
  }
  useEffect(() => {
    fetchUserPosts();
  }, []);
  return (
    <Grid
      container
      id="postsList"
      justify="space-around"
      item xs={9}
    >
      {userPosts
        ? userPosts.map((post) =>
            <UserPost key={post.id} post={post} fetchUserPosts={fetchUserPosts} />
        ) : null
      }
    </Grid>
  );
};

export default UserPosts;