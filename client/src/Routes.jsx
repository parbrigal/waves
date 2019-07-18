import React from 'react';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Shop from './components/shop/Shop';
import DashBoard from './components/user/Dashboard';
import AddProduct from './components/user/admin/AddProduct'
import ManageCategories from './components/user/admin/ManageCategories'
import Layout from './hoc/Layout';
import Auth from './hoc/Auth';
import { Switch, Route } from 'react-router-dom';
import ProductPage from './components/product/ProductPage';


const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/login" component={Auth(Login,false)} />
        <Route path="/register" component={Auth(Register,false)} />
        <Route path="/user/dashboard" component={Auth(DashBoard,true)} />
        <Route path="/admin/add_product" component={Auth(AddProduct,true)} />
        <Route path="/admin/manage_categories" component={Auth(ManageCategories,true)} />
        <Route path="/product_detail/:id" component={Auth(ProductPage,null)} />
        <Route path="/shop" exact component={Auth(Shop,null)} />
        <Route path="/" exact component={Auth(Home,null)} />
        
      </Switch>
    </Layout>
  );
};

export default Routes;
