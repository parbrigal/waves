import React from 'react';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import DashBoard from './components/user/Dashboard';
import Layout from './hoc/Layout';
import { Switch, Route } from 'react-router-dom';


const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/user/dashboard" component={DashBoard} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  );
};

export default Routes;
