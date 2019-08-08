import React, { Component } from 'react'
import PageTop from '../elements/PageTop';
import ProdNFO from './ProdNFO';
import ProdImg from './ProdImg';

import {getProductDetail, clearProductDetail} from '../../store/actions/product_actions.js';

import { connect } from 'react-redux';
import { addToCart } from '../../store/actions/user_actions.js'

class ProductPage extends Component {

    componentDidMount() {
      const id = this.props.match.params.id;
      this.props.dispatch(getProductDetail(id)).then(response => {
        if(!this.props.products.prodDetail) {
            this.props.history.push('/notfound')
        }
      })
    }

    componentWillUnmount() {
      this.props.dispatch(clearProductDetail());
    }
  
    addToCartHandler = (id) => {
      this.props.dispatch(addToCart(id));
    }

    render() {
        return (
            <div>
                <PageTop title="Product Detail"/>
                <div className="container">
                  {
                    this.props.products.prodDetail ? 
                      <div className='product_detail_wrapper'>
                        <div className="left">
                          <div style={{width:'500px'}}>
                            <ProdImg detail={this.props.products.prodDetail}/>
                          </div>
                        </div>
                        <div className="right">
                         <ProdNFO addToCart={(id) => this.addToCartHandler(id)} detail={this.props.products.prodDetail}/>
                        </div>
                      </div>
                    : 'Loading'
                  }


                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      products: state.products
    };
  };

export default connect(mapStateToProps)(ProductPage); 