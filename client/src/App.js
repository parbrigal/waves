import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  componentDidMount() {
    axios.get('/api/product/list_brands').then(resp => {
      console.log(resp);
    })

  }
  render() {
    return (
      <div className="App">
          APP
      </div>
    );
  }
}

export default App;
