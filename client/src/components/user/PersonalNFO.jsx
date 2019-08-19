import React, { Component } from 'react'

import FormField from "../elements/Form/FormField";

import { connect } from "react-redux";

import {updateUserProfile,clearUpdateUserProfile} from "../../store/actions/user_actions";

import {
  update,
  generateData,
  isFormValid,
  populateFields
} from "../elements/Form/formActions";

class PersonalNFO extends Component {

  state = {
    formError: false,
    formSuccess: false,
    formData: {
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
      this.props.dispatch(updateUserProfile(dataToSubmit)).then(() => {
        if (this.props.user.updateUser.success) {

            this.setState({
              formSuccess : true  
            },() => {
                setTimeout(() => {
                    this.props.dispatch(clearUpdateUserProfile())
                    this.setState({
                        formSuccess: false
                    })
                },2000)
            })

        }
      })
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

  componentDidMount() {
    const newFormData = populateFields(this.state.formData,this.props.user.userData);

    this.setState({
      formData : newFormData
    })

  }

  render() {
    return (
      <div>
        <form onSubmit={ev => this.submitForm(ev)}>

          <h2>Personal Details</h2>
          <div className="form_block_two">
            <div className="block">
              <FormField
                id={"name"}
                formData={this.state.formData.name}
                change={element => this.updateForm(element)}
              />
            </div>
            <div className="block">
              <FormField
                id={"lastname"}
                formData={this.state.formData.lastname}
                change={element => this.updateForm(element)}
              />
            </div>
          </div>
          <div>
            <FormField
              id={"email"}
              formData={this.state.formData.email}
              change={element => this.updateForm(element)}
            />
          </div>
          <div>
            {
              this.state.formSuccess ? 
              <div className="form_success">Update Success!</div>
              :null

            }
            {this.state.formError ? (
              <div className="error_label">Please check your data</div>
            ) : null}
            <button onClick={ev => this.submitForm(ev)}>
              Update
            </button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(PersonalNFO);