import React, { useState, useEffect} from 'react';
import axios from "../../../../axios.config";
/*import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { useForm, Controller, FormProvider } from "react-hook-form";
import axios from "../../axios.config";
import Avatar from '@material-ui/core/Avatar';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';*/
import {LinkBox} from '../../../../components'
import {Grid} from "@material-ui/core";

const UserPosts = ({userId}) => {
  const [userPosts, setUserPosts] = useState(null)
  const fetchUserPosts = () => {
        axios.get(`v1/wishub/posts/${userId}/by-author`)
      .then(res => {
        if(res.status === 200){
          console.log(res.data)
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
        justify="flex-end"
        direction="column"
        id="postsList"
        item xs={12}
      >
        {userPosts
          ? userPosts.map((post) => <Grid item xs={9}>
            <LinkBox key={post.id} post={post} />
          </Grid>
            ) : null
          }
      </Grid>
  );
};

export default UserPosts;