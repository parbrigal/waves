import React, { Component } from "react";
import FormField from "../../elements/Form/FormField";
import {
  update,
  generateData,
  isFormValid,
  resetFields
} from "../../elements/Form/formActions";

import { connect } from "react-redux";
import { getWoods, addWood } from "../../../store/actions/product_actions";

class ManageWoods extends Component {
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
          placeholder: "Enter the brand name."
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  showCategoryItems = () => (
    this.props.products.woods
      ? this.props.products.woods.map((wd, i) => (
          <div className="category_item" key={wd._id}>
            {wd.name}
          </div>
        ))
      : null
  )

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "woods");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formData,"woods");
    this.setState({
      formData : newFormData,
      formSuccess : true
    })
  }

  submitForm = ev => {
    ev.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "woods");
    let formIsValid = isFormValid(this.state.formData, "woods");
    let existingWoods = this.props.products.woods;

    if (formIsValid) {
        this.props.dispatch(addWood(dataToSubmit,existingWoods)).then(response => {
          if(response.payload.success) {
            this.resetFieldHandler();
          }
          else {
            this.setState({
              formError : true
            })
          }
        })
    } else {
      this.setState({
        formError: true
      });
    }
  };

  componentDidMount() {
    this.props.dispatch(getWoods());
  }

  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Manage Woods</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">{this.showCategoryItems()}</div>
          </div>
          <div className="right">
            <form onSubmit={ev => this.submitForm(ev)}>
              <FormField
                id={"name"}
                formData={this.state.formData.name}
                change={element => this.updateForm(element)}
              />
              {this.state.formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}

              <button onClick={ev => this.submitForm(ev)}>Add Wood</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      products: state.products
    };
  };

export default connect(mapStateToProps)(ManageWoods);
