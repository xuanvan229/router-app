import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password: '',
      redirectToReferrer: false
    }

  }
  updateUsername(event){
    this.setState({
      username: event.target.value
    })
    console.log(event.target.value);
  }
  updatePassword(event){
    this.setState({
      password: event.target.value
    })
    console.log(event.target.value);

  }
  _onclick(event){
    this.setState({
      redirectToReferrer: true
    })
    console.log("teng teng");
  }
  render(){
    if(this.state.redirectToReferrer){
      return(
        <Redirect to='/todo' something="foo"/>
      )
    }
    return(
      <div className="container login_form">
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <div className="input-group">
                  <span className="input-group-addon" id="sizing-addon2">@</span>
                  <input type="text" onChange={this.updateUsername.bind(this)} className="form-control" placeholder="Username" aria-describedby="sizing-addon2"/>
                </div>
                <div className="input-group">
                  <span className="input-group-addon" id="sizing-addon2">@</span>
                  <input type="text" onChange={this.updatePassword.bind(this)} className="form-control" placeholder="Password" aria-describedby="sizing-addon2" />
                </div>
                <button type="button" className="btn btn-primary btn-block button_ok" onClick={this._onclick.bind(this)}>Button 1</button>
                </div>
            </div>
      </div>
    )
  }
}
