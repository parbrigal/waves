import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../store/actions/user_actions";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function(ComposedClass, reload, adminRoute = null) {
  class AuthenticationCheck extends Component {
    state = {
      loading: true
    };

    componentDidMount() {
      this.props.dispatch(auth()).then(res => {
        let user = this.props.user.userData;
        console.log(user);

        if(!user.isAuth) {
          if(reload) {
            this.props.history.push("/login")
          }
        }
        else {
          if (adminRoute && !user.isAdmin) {
            this.props.history.push("/dashboard")
          }
          else{
            if(reload === false) {
              this.props.history.push("/dashboard")
            }
          }
        
        }
      })

      this.setState({loading : false})
    }

    render() {
      if (this.state.loading) {
        return (
          <div className="main_loader">
            <CircularProgress style={{ color: "#2196F3" }} thickness={7} />
          </div>
        );
      }
      return <ComposedClass {...this.props} user={this.props.user}/>;
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user
    };
  }
  return connect(mapStateToProps)(AuthenticationCheck);
}
