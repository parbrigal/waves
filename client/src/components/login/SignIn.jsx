import React, { Component } from "react";
import FormField from '../elements/Form/FormField';

import { update,generateData,isFormValid } from '../elements/Form/formActions';
import { loginUser } from '../../store/actions/user_actions';

import { withRouter } from 'react-router-dom';

import { connect } from "react-redux";

class SignIn extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formData: {
      email: {
        element: 'input',
        value: "",
        config: {
          name: "email_input",
          type:"email",
          placeholder:'Enter your email.'
        },
        validation :{
          required : true,
          email:true,
        },
        valid : false,
        touched : false,
        validationMessage:''
      },
      password: {
        element: 'input',
        value: "",
        config: {
          name: "password_input",
          type:"password",
          placeholder:'Enter your password.'
        },
        validation :{
          required : true,
        },
        valid : false,
        touched : false,
        validationMessage:''
      }
    }
  };

  submitForm = (ev) => {
    ev.preventDefault();

    let dataToSubmit = generateData(this.state.formData,'login');
    let formIsValid = isFormValid(this.state.formData,'login');

    if (formIsValid) {
     this.props.dispatch(loginUser(dataToSubmit)).then(response => {
       if(response.payload.loginSuccess) {
         console.log(response.payload)
         this.props.history.push('/user/dashboard')
       }
       else {
         this.setState({
           formError : true
         })
       }
     })
    }
    else {
      this.setState({
        formError : true
      })
    }


  };

  updateForm = (element) => {
 
    const newFormData = update(element,this.state.formData,'login')
    this.setState({
      formError : false,
      formData : newFormData
    })
  };

  render() {
    return (
      <div className="signin_wrapper">
        <form onSubmit={ev => this.submitForm(ev)} />
        <FormField id={'email'} formData={this.state.formData.email} change={(element) => this.updateForm(element)}>
        </FormField>
        <FormField id={'password'} formData={this.state.formData.password} change={(element) => this.updateForm(element)}>
        </FormField>
        {this.state.formError ? <div>Please check your data</div>:null}
        <button onClick={ev => this.submitForm(ev)}>Log In</button>
      </div>
    );
  }
}

export default connect()(withRouter(SignIn));
