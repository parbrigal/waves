import React from "react";
import Home from "./components/home/Home";
import Login from './components/login/Login';
import Layout from "./hoc/Layout";
import { Switch, Route } from "react-router-dom";


const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  );
};

export default Routes;
