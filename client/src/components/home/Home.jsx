import React, { Component } from 'react';
import HomeSlider from './HomeSlider';
import Promotions from './Promotions';
import CardBlock from '../elements/CardBlock';

import { connect } from 'react-redux';


import { getProductsBySell, getProductsByArrival } from '../../store/actions/product_actions';

class Home extends Component {

  componentDidMount() {
    this.props.dispatch(getProductsBySell());
    this.props.dispatch(getProductsByArrival());
  }

  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock list={this.props.products.bySell} title="Best Selling"/>
        <Promotions />
        <CardBlock list={this.props.products.byArrival} title="New Arrivals"/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products : state.products
  }
}

export default connect(mapStateToProps)(Home);