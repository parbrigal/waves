import React, { Component } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

class PayPal extends Component {
  render() {
    const onSuccess = payment => {
      this.props.onSuccess(payment);
      // Congratulation, it came here means everything's fine!
      //console.log("The payment was succeeded!", JSON.stringify(payment));
      // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
      //{"paid":true,"cancelled":false,"payerID":"ESNMKKTM98JLW","paymentID":"PAYID-LVIEJGA0RD48454MH5118806","paymentToken":"EC-07F9896144732925K","returnUrl":"https://www.paypal.com/checkoutnow/error?paymentId=PAYID-LVIEJGA0RD48454MH5118806&token=EC-07F9896144732925K&PayerID=ESNMKKTM98JLW","address":{"recipient_name":"Jacob Zuma","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},"email":"zupta@gmail.com"}
    };

    const onCancel = data => {
      // User pressed "cancel" or close Paypal's popup!
      console.log("The payment was cancelled!", JSON.stringify(data));
      // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    };

    const onError = err => {
      // The main Paypal's script cannot be loaded or somethings block the loading of that script!
      console.log("Error", JSON.stringify(err));
      // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
      // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    };

    let env = "sandbox"; // you can set here to 'production' for production
    let currency = "USD"; // or you can set this value from your props or state
    let total = this.props.toPay; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

    const client = {
      sandbox:
        "AXYpkUcNnMPtBOws2GNBKXaRWGS0L6nmMh6xscFaG0-0JK0f2LaixdsnHp6lx3Snu8T84mfiI8ahZXTW",
      production: ""
    };
    return (
      <div>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: "large",
            color: "blue",
            shape: "rect",
            label: "checkout"
          }}
        />
      </div>
    );
  }
}

export default PayPal;
