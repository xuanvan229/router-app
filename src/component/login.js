import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import * as firebase from 'firebase'

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password: '',
      redirectToReferrer: false,
      alluser: ''
    }

  }
  componentDidMount(){
    firebase.database().ref('username/').on('value',(snapshot)=>{
      const currentuser = snapshot.val();
      if(currentuser != null ){
        this.setState({
          alluser: currentuser
        })
      }
    })
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

    var check = false;
    console.log("begin");
    console.log(this.state.alluser);
    for (var i= 0; i<this.state.alluser.length;i++){
      if(this.state.username == this.state.alluser[i].username && this.state.password == this.state.alluser[i].password){
        check = true
        console.log('done');
      }
    }
    if(check==true){
      this.setState({
        redirectToReferrer: true
      })
    }
  }

  render(){
    if(this.state.redirectToReferrer){
      return(
        <Redirect to={`/${this.state.username}`} />
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
