import React from "react";

const FormField = ({ formData, change, id }) => {
  
  const showError = () => {
    let errorMessage = null;

    if (formData.validation && !formData.valid) {
      errorMessage = (
        <div className="error_label">
          {formData.validationMessage}
        </div>
      )

    }
    return errorMessage;
  }
  const renderTemplate = () => {
    let formTemplate = null;

    switch (formData.element) {
      case "input": {
        formTemplate = (
          <div className="formBlock">
            <input
              {...formData.config}
              value={formData.value}
              onBlur={ev => change({ ev, id, blur: true })}
              onChange={ev => change({ ev, id})}
            />
            {showError()}
          </div>
        );
        break;
      }
      default:
        formTemplate = null;
    }
    return formTemplate;
  };
  return <div>{renderTemplate()}</div>;
};

export default FormField;
