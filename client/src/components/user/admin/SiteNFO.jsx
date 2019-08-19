import React, { Component } from 'react';
import FormField from '../../elements/Form/FormField'
import {
    update,
    generateData,
    isFormValid,
    populateFields
  } from "../../elements/Form/formActions";

import {connect} from 'react-redux'; 

class SiteNFO extends Component {
    render() {
        return (
            <div>
                form
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      site: state.site
    };
  }

export default connect(mapStateToProps)(SiteNFO);