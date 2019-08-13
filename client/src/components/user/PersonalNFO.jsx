import React, { Component } from 'react'

import FormField from "../elements/Form/FormField";

import { connect } from "react-redux";

import {
    update,
    generateData,
    isFormValid
  } from "../elements/Form/formActions";

class PersonalNFO extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formData : {
            name: {
                element: "input",
                value: "",
                config: {
                  name: "name_input",
                  type: "text",
                  placeholder: "Enter your name."
                },
                validation: {
                  required: true
                },
                valid: false,
                touched: false,
                validationMessage: ""
              },
              lastname: {
                element: "input",
                value: "",
                config: {
                  name: "lastname_input",
                  type: "text",
                  placeholder: "Enter your last name."
                },
                validation: {
                  required: true
                },
                valid: false,
                touched: false,
                validationMessage: ""
              },
              email: {
                element: "input",
                value: "",
                config: {
                  name: "email_input",
                  type: "email",
                  placeholder: "Enter your email."
                }
                }
        }
    }

    submitForm = ev => {
        ev.preventDefault();
    
        let dataToSubmit = generateData(this.state.formData, "update_user");
        let formIsValid = isFormValid(this.state.formData, "update_user");
    
        if (formIsValid) {
          console.log(dataToSubmit)
        } else {
          this.setState({
            formError: true
          });
        }
      };

    updateForm = element => {
        const newFormData = update(element, this.state.formData, "update_user");
        this.setState({
          formError: false,
          formData: newFormData
        });
      };

    render() {
        return (
            <div>
                <form onSubmit={ev => this.submitForm(ev)}>
                
                </form>
            </div>
        )
    }
}

export default PersonalNFO;