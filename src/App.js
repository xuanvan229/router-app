import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Login from './component/login'
import Main from './component/maintodo'
import Register from './component/register'

import './App.css';

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/todo' />}
    />
  )
}

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      authed:false
    }
  }
  render() {
    return (
      <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/register" component={Register}/>

          <PublicRoute authed={this.state.authed} path='/:todo' component={Main}  />
          </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
