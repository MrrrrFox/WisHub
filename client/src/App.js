import React, {useState, useEffect} from 'react';
import {TopBar, Navbar, Login, Register, PostAdder} from './components';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import withTheme from './hoc/withTheme';



const App = () => {
 const initUserLogged = localStorage.getItem('isLogged') || 'false';
  const [isLogged, setLogged] = useState(initUserLogged)

  window.addEventListener('storage',  () => {
    setLogged(localStorage.getItem('isLogged') );
  });


  return (
    <BrowserRouter>
      <Switch>
          {/* TODO routes to posts*/}
          {/*TODO add component Login*/}
        <Route exact path="/signin" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/post-add" component={PostAdder}/>
      </Switch>
      <CssBaseline />
      <div className="App">
        <TopBar isLogged = {isLogged} setLogged={setLogged}/>
        <Navbar/>
      </div>
    </BrowserRouter>
  );
};



export default withTheme(App);
