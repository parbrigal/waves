import React from 'react';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Shop from './components/shop/Shop';
import DashBoard from './components/user/Dashboard';
import AddProduct from './components/user/admin/AddProduct'
import Layout from './hoc/Layout';
import Auth from './hoc/Auth';
import { Switch, Route } from 'react-router-dom';


const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/login" component={Auth(Login,false)} />
        <Route path="/register" component={Auth(Register,false)} />
        <Route path="/user/dashboard" component={Auth(DashBoard,true)} />
        <Route path="/admin/add_product" component={Auth(AddProduct,true)} />
        <Route path="/shop" exact component={Auth(Shop,null)} />
        <Route path="/" exact component={Auth(Home,null)} />
        
      </Switch>
    </Layout>
  );
};

export default Routes;
