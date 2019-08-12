import React, { Component } from "react";
import UserNav from "../../hoc/UserNav";

import { connect } from "react-redux";

import UserCartBlock from "./UserCartBlock";

import { getCartItems, removeCartItem, onSuccessBuy } from "../../store/actions/user_actions";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faFrown from "@fortawesome/fontawesome-free-solid/faFrown";
import faSmile from "@fortawesome/fontawesome-free-solid/faSmile";

import PayPal from '../../components/elements/PayPal';
//PAYPAL
//AXYpkUcNnMPtBOws2GNBKXaRWGS0L6nmMh6xscFaG0-0JK0f2LaixdsnHp6lx3Snu8T84mfiI8ahZXTW

class UserCart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false
  };

  componentDidMount() {
    let cartItems = [];
    let user = this.props.user;
    let { cart } = user.userData;
    if (cart) {
      if (cart.length > 0) {
        user.userData.cart.forEach(item => {
          cartItems.push(item.id);
        });

        this.props.dispatch(getCartItems(cartItems, cart)).then(() => {
          if (this.props.user.cartDetail.length > 0) {
            this.calculateTotal(this.props.user.cartDetail);
          }
        });
      }
    }
  }

  calculateTotal = cartDetail => {
    let total = 0;
    cartDetail.forEach(item => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    this.setState({
      total,
      showTotal: true
    });
  };

  showPurchaseSuccessMessage = () => (
    <div className="cart_success">
      <FontAwesomeIcon icon={faSmile} />
      <div>THANK YOU!</div>
      <div>Your order is now complete!</div>
    </div>
  );

  showEmptyCartMessage = () => (
    <div className="cart_no_items">
      <FontAwesomeIcon icon={faFrown} />
      <div>You don't have any items yet!</div>
    </div>
  );

  removeFromCart = (id) => {
    this.props.dispatch(removeCartItem(id)).then(() => {
      if (this.props.user.cartDetail.length <= 0) {
        this.setState({
          showTotal: false
        })
      }
      else {
        this.calculateTotal(this.props.user.cartDetail)
      }
    })
  };

  transactionError = (data) => {
    console.log('Transaction Error');
  }

  transactionCancelled = (data) => {
    console.log('Transaction Cancelled');
  }

  transactionSuccess = (data) => {
    this.props.dispatch(onSuccessBuy({ cartDetail: this.props.user.cartDetail, paymentData: data })).then(() => {
      if (this.props.user.successBuy) {
        this.setState({
          showTotal: false,
          showSuccess: true

        })
      }
    })
  }

  render() {
    return (
      <UserNav>
        <div>
          <h1>MY CART</h1>
          <div className="user_cart">
            <UserCartBlock
              products={this.props.user}
              type="cart"
              removeItem={id => this.removeFromCart(id)}
            />
            {this.state.showTotal ? (
              <div>
                <div className="user_cart_sum">
                  <div>TOTAL AMOUNT : ${this.state.total}</div>
                </div>
              </div>
            ) : this.state.showSuccess ? (
              this.showPurchaseSuccessMessage()
            ) : (
                  this.showEmptyCartMessage()
                )}
          </div>
          {
            this.state.showTotal ?
              <div className="paypal_button_container">
                <PayPal toPay={this.state.total}
                  transactionError={(data) => this.transactionError(data)}
                  transactionCancelled={(data) => this.transactionCancelled(data)}
                  onSuccess={(data) => this.transactionSuccess(data)}
                />
              </div>
              : null
          }
        </div>
      </UserNav>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(UserCart);
