import React, { Component } from "react";
import FormField from "../../elements/Form/FormField";
import {
  update,
  generateData,
  isFormValid,
  resetFields
} from "../../elements/Form/formActions";

import { connect } from "react-redux";
import { getBrands,addBrand } from "../../../store/actions/product_actions";

class ManageBrands extends Component {
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

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "brands");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formData,"brands");
    this.setState({
      formData : newFormData,
      formSuccess : true
    })
  }

  submitForm = ev => {
    ev.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "brands");
    let formIsValid = isFormValid(this.state.formData, "brands");
    let existingBrands = this.props.products.brands;

    if (formIsValid) {
        this.props.dispatch(addBrand(dataToSubmit,existingBrands)).then(response => {
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

  showCategoryItems = () => (
    this.props.products.brands
      ? this.props.products.brands.map((brnd, i) => (
          <div className="category_item" key={brnd._id}>
            {brnd.name}
          </div>
        ))
      : null
  )

  componentDidMount() {
    this.props.dispatch(getBrands());
  }

  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Manage Brands</h1>
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

              <button onClick={ev => this.submitForm(ev)}>Add Brand</button>
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

export default connect(mapStateToProps)(ManageBrands);
