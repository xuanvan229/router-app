import React, { Component } from 'react';
import {
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
      alluser: '',
      nextrg: false
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
    if(check===true){
      this.setState({
        redirectToReferrer: true
      })
    }
  }
  _onclickrg(event){
    this.setState({
      nextrg: true
    })
  }
  render(){
    if(this.state.redirectToReferrer){
      return(
        <Redirect to={`/${this.state.username}`} />
      )
    }
    if(this.state.nextrg){
      return(
        <Redirect to='/register' />
      )
    }
    return(
      <div className="container login-form">
        <div className="row row-header">
          <div className="col-md-4 col-sm-6 col-xs-12 item-1">
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
                <input type="password" onChange={this.updatePassword.bind(this)} className="form-control" placeholder="Password..." aria-describedby="sizing-addon2" />
              </div>
              <button type="button" className="btn btn-danger btn-block button_ok dangnhap" onClick={this._onclick.bind(this)}><b>Login</b></button>
              <button type="button" className="btn btn-danger btn-block button_ok dangky" onClick={this._onclickrg.bind(this)}><b>Register</b></button>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
