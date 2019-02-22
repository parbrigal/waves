import React from 'react';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import DashBoard from './components/user/Dashboard';
import Layout from './hoc/Layout';
import Auth from './hoc/Auth';
import { Switch, Route } from 'react-router-dom';


const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/login" component={Auth(Login,'private')} />
        <Route path="/register" component={Auth(Register,'')} />
        <Route path="/user/dashboard" component={Auth(DashBoard,'')} />
        <Route path="/" exact component={Auth(Home,'public')} />
      </Switch>
    </Layout>
  );
};

export default Routes;
