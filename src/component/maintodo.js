import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
export default class Main extends Component {
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
    console.log(this.props.match.params);
    return(
      <div className="container login_form">
            <div className="row">
                <h1>HELLO WORLD! {this.props.match.params.todo}</h1>
            </div>
      </div>
    )
  }
}
