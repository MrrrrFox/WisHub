import React, {useEffect, useState, lazy, Suspense} from 'react';
import {TopBar, Navbar, Login, Register, PostAdder, Footer} from './components';
import './App.scss';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import withTheme from './hoc/withTheme';

import axios from "./axios.config";

const Posts = lazy(() => import('./pages/Posts/'))
const UserPage = lazy(() => import('./pages/UserPage/'))
const HomePage = lazy(() => import('./pages/HomePage/'))
const Post = lazy(() => import('./pages/Post/'))

const renderLoader = () => <p>Loading</p>;
const App = () => {
  const initUserLogged = localStorage.getItem('isLogged') || null;
  const [isLogged, setLogged] = useState(initUserLogged)
  const [user, setUser] = useState(null)

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
            <UserPage {...props} user={user} getUser={getUser}/>
          )}/>
        </Switch>
      </Suspense>
      <CssBaseline/>
      <div className="App">
        <TopBar isLogged={isLogged} setLogged={setLogged} user={user} setUser={setUser}/>
        <Navbar/>
        <Footer/>
      </div>
    </BrowserRouter>
  );
};


export default withTheme(App);
