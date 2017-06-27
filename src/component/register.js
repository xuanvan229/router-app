import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import * as firebase from 'firebase'

export default class Register extends Component{
  constructor(props){
    super(props);
    this.state={
      username:'',
      password1:'',
      password2:'',
      alluser:'',
      redirectToReferrer: false,
      backlogin:false
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
  updatePassword1(event){
    this.setState({
      password1: event.target.value
    })
    console.log(event.target.value);
  }
  updatePassword2(event){
    this.setState({
      password2: event.target.value
    })
    console.log(event.target.value);
  }
  _onclick(event){

    var check = true;
    console.log("begin");
    console.log(this.state.alluser);
    for (var i= 0; i<this.state.alluser.length;i++){
      if(this.state.username == this.state.alluser[i].username || this.state.password1 != this.state.password2){
        check = false
        console.log('done');
      }
    }
    if(check==true){
      const nextuser = {
        id:this.state.alluser.length,
        username:this.state.username,
        password:this.state.password1
      }
      firebase.database().ref('username/'+nextuser.id).set(nextuser);

      this.setState({
        redirectToReferrer: true
      })
    }
  }
  _onclicklogin(event){
    this.setState({
      backlogin: true
    })
  }
  render(){
    if(this.state.redirectToReferrer){
      return(
        <Redirect to="/" />
      )
    }
    if(this.state.backlogin){
      return(
        <Redirect to="/" />
      )
    }
    return(
      <div className="container login-form">
      <div className="row row-header">
        <div className="col-md-4 item-1">
          <div className="center-block">
            <div className="form-group">
            <p className="content-1">Access tasks everywhere</p>
            <p className="content-2">With app, your tasks are always there: on mobile devices, web browsers, inboxes, and more.</p>
                <div className="input-group">
                  <span className="input-group-addon" id="sizing-addon2"><div className="glyphicon glyphicon-user"></div></span>
                  <input type="text" onChange={this.updateUsername.bind(this)} className="form-control" placeholder="Username..." aria-describedby="sizing-addon2"/>
                </div>
                <div className="input-group">
                  <span className="input-group-addon" id="sizing-addon2"><div className="glyphicon glyphicon-lock"></div></span>
                  <input type="password" onChange={this.updatePassword1.bind(this)} className="form-control" placeholder="Password..." aria-describedby="sizing-addon2" />
                </div><div className="input-group">
                  <span className="input-group-addon" id="sizing-addon2"><div className="glyphicon glyphicon-lock"></div></span>
                  <input type="password" onChange={this.updatePassword2.bind(this)} className="form-control" placeholder="Comfirm Password..." aria-describedby="sizing-addon2" />
                </div>
                <button type="button" className="btn btn-danger btn-block button_ok" onClick={this._onclick.bind(this)}><b>Register</b></button>
                <button type="button" className="btn btn-danger btn-block button_ok" onClick={this._onclicklogin.bind(this)}><b>Login</b></button>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
