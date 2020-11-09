import React, { useState, useEffect } from 'react';
import { BrowserRouter as Route, Switch } from "react-router-dom";
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import UserContext from './utils/context/UserContext';
import TodosList from './components/list.component';
import CreateTodo from './components/create.component';
import EditTodo from './components/edit.component';
import API from './utils/API';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {

  //get user from LoalStorage

  useEffect(() => {
    const userFromLocal = JSON.parse(localStorage.getItem('user'));
    if (userFromLocal) {
      setUserDetails(userFromLocal);
    }
  });

  return (
      <Route>
        <UserContext.Provider>
          <div className="container" style={{ height: "100vh" }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={SignIn} />
              <Route path="/register" component={SignUp} />
              <Route path='/list' component={TodosList} />
              <Route path='/edit/:id' component={EditTodo} /> 
              <Route path='/create' component={CreateTodo} />
            </Switch>
          </div>
        </UserContext.Provider>
      </Route>
  );
}
