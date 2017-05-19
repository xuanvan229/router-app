import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import * as firebase from 'firebase'

export default class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password: '',
      redirectToReferrer: false,
      todo: [

      ],
      work: ''
    }

  }
  componentDidMount(){
    firebase.database().ref('alltodo/'+this.props.match.params.todo+'/').on('value',(snapshot)=>{
      var currenttodo = snapshot.val();
      console.log(currenttodo);
      // if (!currenttodo.map){
      //       currenttodo = Object.keys(currenttodo).map((k,i)=>currenttodo[k])
      //   }
      if(currenttodo != null ){
        this.setState({
          todo: currenttodo
        })
      }
    })

  }
  updatetodo(event){
    this.setState({
      work: event.target.value
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
    console.log(this.state.work);
    const nextodo = {
      id:this.state.todo.length,
      todowork:this.state.work
    }
    firebase.database().ref('alltodo/'+this.props.match.params.todo+'/'+nextodo.id).set(nextodo);
    console.log(this.state.todo);
    console.log("teng teng");
  }
  render(){
    const currentMessage = this.state.todo.map((td,i)=>{
      return(
        <li key={i} className="list-group-item">{td.todowork}</li>
      )
    })
    // var renderitem = () =>{
    //   for (var i=0;i<this.state.todo.length;i++)
    //   var bien = this.state.todo[i];
    //       console.log(this.state.todo[i]);
    //   return(
    //     <li key={i} className="list-group-item">{bien}</li>
    //   )
    // }
    // console.log(this.state.todo);
    //   var currentMessage='';
    //     if(this.state.todo){
      //   var currentMessage=this.state.todo.map((message,i)=>{
       //
      //    return(
       //
      //      <li key={i} className="list-group-item">{message}</li>
       //
      //    )
      //  })
    //  }
    // console.log(this.props.match.params);
    return(
      <div className="container login_form">
            <div className="row">
            <div className="col-md-4 col-md-offset-4">
                  <ul className="list-group">
                  {currentMessage}
                  </ul>

            </div>
              <div className="col-md-4 col-md-offset-4">
                      <div className="form-group">
                      <label htmlFor="exampleInputEmail1">TODO</label>
                      <input type="email" onChange={this.updatetodo.bind(this)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter TODO" />
                      <small id="emailHelp" className="form-text text-muted">Well never share your email with anyone else.</small>
                          </div>
                      <button type="button" className="btn btn-primary" onClick={this._onclick.bind(this)}>Primary</button>
              </div>
            </div>
      </div>
    )
  }
}
