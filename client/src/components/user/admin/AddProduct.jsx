import React, { Component } from "react";
import UserNav from "../../../hoc/UserNav";

import {
  update,
  generateData,
  isFormValid,
  populateOptionFields
} from "../../elements/Form/formActions";

import FormField from "../../elements/Form/FormField";
import { connect } from "react-redux";

import {
  getBrands,
  getWoods,
  addProduct
} from "../../../store/actions/product_actions.js";

class AddProduct extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "Product Name",
          name: "name_input",
          type: "text",
          placeholder: "Enter the product name."
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      description: {
        element: "textarea",
        value: "",
        config: {
          label: "Product Description",
          name: "description_input",
          type: "text",
          placeholder: "Enter the product description."
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      price: {
        element: "input",
        value: "",
        config: {
          label: "Product Price",
          name: "price_input",
          type: "number",
          placeholder: "Enter the product price."
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      brand: {
        element: "select",
        value: "",
        config: {
          label: "Product Brand",
          name: "brand_input",
          placeholder: "Select the product brand.",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      shipping: {
        element: "select",
        value: "",
        config: {
          label: "Shipping",
          name: "shipping_input",
          placeholder: "Select the product brand.",
          options: [{ key: true, value: "Yes" }, { key: false, value: "No" }]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      available: {
        element: "select",
        value: "",
        config: {
          label: "Available, in stock.",
          name: "available_input",
          placeholder: "Select the product brand.",
          options: [{ key: true, value: "Yes" }, { key: false, value: "No" }]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      wood: {
        element: "select",
        value: "",
        config: {
          label: "Wood Material",
          name: "wood_input",
          placeholder: "Select the product brand.",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      frets: {
        element: "select",
        value: "",
        config: {
          label: "Frets",
          name: "frets_input",
          placeholder: "Select the product brand.",
          options: [
            { key: 20, value: 20 },
            { key: 21, value: 21 },
            { key: 22, value: 22 },
            { key: 24, value: 24 }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      publish: {
        element: "select",
        value: "",
        config: {
          label: "Publish",
          name: "publish_input",
          placeholder: "Set visibility",
          options: [
            { key: true, value: "Public" },
            { key: false, value: "Hidden" }
          ]
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

  updateFields = newFormData => {
    this.setState({
      formData: newFormData
    });
  };

  componentDidMount() {
    const formData = this.state.formData;

    this.props.dispatch(getBrands()).then(response => {
      const newFormData = populateOptionFields(
        formData,
        this.props.products.brands,
        "brand"
      );
      this.updateFields(newFormData);
    });
    this.props.dispatch(getWoods()).then(response => {
      const newFormData = populateOptionFields(
        formData,
        this.props.products.woods,
        "wood"
      );
      this.updateFields(newFormData);
    });
  }

  resetFieldHandler = () => {

    //const newFormData = resetFields;
    this.setState({
      formSuccess : true
    })
  }

  submitForm = ev => {
    ev.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "products");
    let formIsValid = isFormValid(this.state.formData, "products");

    if (formIsValid) {

      this.props.dispatch(addProduct(dataToSubmit)).then(() => {
        if(this.props.products.addProduct.success) {
            this.resetFieldHandler(); 
        }
        else {
          this.setState({
            formError:true
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
    const newFormData = update(element, this.state.formData, "products");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  render() {
    return (
      <UserNav>
        <div>
          <h1>Add Product</h1>
          <form onSubmit={ev => this.submitForm(ev)}>
            <FormField
              id={"name"}
              formData={this.state.formData.name}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"description"}
              formData={this.state.formData.description}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"price"}
              formData={this.state.formData.price}
              change={element => this.updateForm(element)}
            />
            <div className="form_devider" />
            <FormField
              id={"brand"}
              formData={this.state.formData.brand}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"shipping"}
              formData={this.state.formData.shipping}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"available"}
              formData={this.state.formData.available}
              change={element => this.updateForm(element)}
            />
            <div className="form_devider" />
            <FormField
              id={"wood"}
              formData={this.state.formData.wood}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"frets"}
              formData={this.state.formData.frets}
              change={element => this.updateForm(element)}
            />
            <div className="form_devider" />
            <FormField
              id={"publish"}
              formData={this.state.formData.publish}
              change={element => this.updateForm(element)}
            />
            {this.state.formSuccess ? (
              <div className="form_success">Success!</div>
            ) : null}
            {this.state.formError ? (
              <div className="error_label">Please check your data</div>
            ) : null}

            <button onClick={ev => this.submitForm(ev)}>Create Account</button>
          </form>
        </div>
      </UserNav>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(AddProduct);
