
import React from 'react';
import Auth from './Components/Auth/Auth';
import Dashboard from './Components/Dashboard/Dashboard';
import Form from './Components/Form/Form';
import Post from './Components/Post/Post';
import {Switch,Route} from 'react-router-dom';

export default(
    <Switch>
        <Route component={Auth} exact path='/'/>
        <Route component={Dashboard} path='/dashboard'/>
        <Route component={Post} path='/post/:postid'/>
        <Route component={Form} path='/new'/>
    </Switch>
);