import React, {useEffect, useState} from 'react';
import {TopBar, Navbar, Login, Register, PostAdder} from './components';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import withTheme from './hoc/withTheme';
import {Posts} from './pages'
import axios from "./axios.config";


const App = () => {
 const initUserLogged = localStorage.getItem('isLogged') || null;
  const [isLogged, setLogged] = useState(initUserLogged)
  const [user, setUser] = useState(null)
  window.addEventListener('storage',  () => {
    setLogged(localStorage.getItem('isLogged') );
  });

  const getUser = () => {
    console.log(isLogged)
    axios.get('v1/users/auth/user/',{headers:{'Authorization': `Token ${isLogged}`}})
      .then(res => {
        if(res.status === 200){
          console.log(res.data)
          setUser(res.data)
        }
      })
      .catch((error) => {
        if( error.response ){
          console.log(error.response);
          }
      });
  }
  useEffect(() => {
    if( isLogged !== null){
      getUser()
    }
    else {
      setUser(null)
    }

  }, [isLogged])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signin" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/post-add" render={(props) =>(
          <PostAdder {...props} user={user}/>
        )}/>
        <Route path="/posts/:id" component={Posts}/>
      </Switch>
      <CssBaseline />
      <div className="App">
        <TopBar isLogged = {isLogged} setLogged={setLogged} user={user}/>
        <Navbar/>
      </div>
    </BrowserRouter>
  );
};



export default withTheme(App);
