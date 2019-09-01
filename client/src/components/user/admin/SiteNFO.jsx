import React, { Component } from "react";
import FormField from "../../elements/Form/FormField";
import {
  update,
  generateData,
  isFormValid,
  populateFields
} from "../../elements/Form/formActions";

import { connect } from "react-redux";

import { getSiteData,updateSiteData } from '../../../store/actions/site_actions';

class SiteNFO extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      address: {
        element: "input",
        value: "",
        config: {
          label: "Address",
          name: "address_input",
          type: "text",
          placeholder: "Enter the site address."
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      hours: {
        element: "input",
        value: "",
        config: {
          label: "Business Hours",
          name: "hours_input",
          type: "text",
          placeholder: "Enter Business Hours"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      phone: {
        element: "input",
        value: "",
        config: {
          label: "Phone No.",
          name: "phone_input",
          type: "text",
          placeholder: "Enter Phone No"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      email: {
        element: "input",
        value: "",
        config: {
          label: "Email",
          name: "email_input",
          type: "text",
          placeholder: "Enter Email"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      }
    }
  };

  submitForm = ev => {
    ev.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "site_info");
    let formIsValid = isFormValid(this.state.formData, "site_info");

    if (formIsValid) {
      this.props.dispatch(updateSiteData(dataToSubmit)).then(() => {
        this.setState({
          formSuccess : true
        },() => {
          setTimeout(() => {
            this.setState({
              formSuccess : false
            })
          },2000)
          })
        })
    } else {
      this.setState({
        formError: true
      });
    }
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "site_info");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  componentDidMount() {
    console.log("Mounting....")
    this.props.dispatch(getSiteData()).then(() => {
        console.log(this.props.site.siteData[0])

        const newFormData = populateFields(this.state.formData,this.props.site.siteData[0])

        this.setState({
            formData : newFormData
        })
    }) 
 
  }

  render() {
    return (
      <div>
        <form onSubmit={ev => this.submitForm(ev)}>
            <h1>Site Info</h1>
          <FormField
            id={"address"}
            formData={this.state.formData.address}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={"hours"}
            formData={this.state.formData.hours}
            change={element => this.updateForm(element)}
          />
         <FormField
            id={"phone"}
            formData={this.state.formData.phone}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={"email"}
            formData={this.state.formData.email}
            change={element => this.updateForm(element)}
          /> 
          {this.state.formSuccess ? (
            <div className="form_success">Success!</div>
          ) : null}
          {this.state.formError ? (
            <div className="error_label">Please check your data</div>
          ) : null}
          <button onClick={ev => this.submitForm(ev)}>Save</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    site: state.site
  };
}

export default connect(mapStateToProps)(SiteNFO);
