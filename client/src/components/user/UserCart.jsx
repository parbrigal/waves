import React, { Component } from 'react'
import UserNav from '../../hoc/UserNav';

import { connect } from 'react-redux';
import { getCartItems } from '../../store/actions/user_actions';


import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown'
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile'

class UserCart extends Component {
    state = {
        loading : true,
        total : 0,
        showTotal : false,
        showSuccess : false
    }

    componentDidMount() {
        let cartItem = [];
        let user = this.props.user;
        let { cart } = user.userData;
        if (cart) {

            if (cart.length > 0) {
                user.userData.cart.forEach(item => {
                    cartItem.push(item.id)
                })

                this.props.dispatch(getCartItems(cartItem,cart)).then(() => {
                    
                }) 
            }

        }
    }

    render() {
        return (
            <UserNav>
            <div>
                cart
            </div>
            </UserNav>
        )
    }
}

const mapStateToProps = state => {
    return {
      user: state.user
    };
  };

export default connect(mapStateToProps)(UserCart)