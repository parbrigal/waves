import React from "react";
import OurButton from "../elements/OurButton";
import SignIn from "./SignIn";

const Login = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h2>New Customers</h2>
            <p>
              Lorem ipsum dolor amet shaman thundercats green juice lyft
              taxidermy shabby chic af blog. Ugh vaporware asymmetrical vegan
              actually affogato. Snackwave heirloom food truck, swag everyday
              carry sustainable taiyaki forage ramps keytar air plant flannel.
              Paleo tattooed taiyaki photo booth tofu gluten-free affogato
              whatever tilde shaman meh austin poke green juice.
            </p>
            <OurButton
              type="default"
              title="Create Account"
              linkTo="/register"
              addStyles={{ margin: "10px 0 0 0" }}
            />
          </div>
          <div className="right">
            <h1>Welcome Back!</h1>
            <p>If you already have an account, please sign in.</p>
            <SignIn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
