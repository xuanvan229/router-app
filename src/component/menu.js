import React, { Component } from 'react';

export default class Menu extends Component{
  render(){
    return(
    <div className="container ">
    <div className="row">
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">TodoList</a>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            
            <ul className="nav navbar-nav navbar-right">
              <li><a href="/"><span className="glyphicon glyphicon-log-in"></span> LogOut</a></li>
            </ul>
          </div>
        </div>
      </nav>
      </div>
    </div>
    )
  }
}
