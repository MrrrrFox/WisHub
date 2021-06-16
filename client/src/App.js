import React, {useEffect, useState, lazy, Suspense} from 'react';
import {TopBar, Navbar, Login, Register, PostAdder, Footer} from './components';
import './App.scss';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import withTheme from './hoc/withTheme';

import axios from "./axios.config";
import blank from "./assets/images/blank.png";

const Posts = lazy(() => import('./pages/Posts/'))
const UserPage = lazy(() => import('./pages/UserPage/'))
const HomePage = lazy(() => import('./pages/HomePage/'))
const Post = lazy(() => import('./pages/Post/'))

const renderLoader = () => <p>Loading</p>;
const App = () => {
  const initUserLogged = localStorage.getItem('isLogged') || null;
  const [isLogged, setLogged] = useState(initUserLogged)
  const [user, setUser] = useState(null)
  const [userAvatar, setUserAvatar] = useState(blank)

  window.addEventListener('storage', () => {
    setLogged(localStorage.getItem('isLogged'));
  });

  const getUser = () => {
    axios.get('v1/users/auth/user/', {headers: {'Authorization': `Token ${isLogged}`}})
      .then(res => {
        if (res.status === 200) {
          setUser(res.data)
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response);
        }
      });
  }


  const getUserAvatar = () => {

    const config = {
      headers: {
        'Authorization': `Token ${localStorage.getItem('isLogged')}`,
      }
    }
    if (user != null) {
      axios.get(`v1/wishub/users/avatar/`, config)
        .then(res => {
          if (res.status === 200) {
            setUserAvatar(`data:image/png;base64,${res.data.avatar}`);
          }
        })
        .catch((error) => {
          if (error.response) {
            console.error(error.response.data); // => the response payload
          }
        });
    } else {
      setUserAvatar(blank)
    }

  }

  useEffect(() => {
    getUserAvatar()
  }, [user])

  useEffect(() => {
    if (isLogged != null) {
      getUser()
    }
  }, [isLogged])

  return (
    <BrowserRouter>
      <Suspense fallback={renderLoader()}>
        <Switch>
          <Route exact path={"/"} render={(props) => (
            <HomePage {...props} user={user}/>
          )}/>
          <Route exact path="/signin" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/post-add" render={(props) => (
            <PostAdder {...props} user={user}/>
          )}/>
          <Route path="/posts/:id" render={(props) => (
            <Posts {...props} user={user}/>
          )}/>
          <Route path="/post/:id" render={(props) => (
            <Post {...props} user={user}/>
          )}/>
          <Route path="/user/:id" render={(props) => (
            <UserPage {...props} user={user} getUser={getUser} userAvatar={userAvatar} setUserAvatar={setUserAvatar}/>
          )}/>
        </Switch>
      </Suspense>
      <CssBaseline/>
      <div className="App">
        <TopBar isLogged={isLogged} setLogged={setLogged} user={user}
                setUser={setUser} userAvatar={userAvatar} />
        <Navbar/>
        <Footer/>
      </div>
    </BrowserRouter>
  );
};


export default withTheme(App);
