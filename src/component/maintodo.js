import React, { Component } from 'react';
// import TEST from './components/test';
import * as firebase from 'firebase';
import {
  Redirect
} from 'react-router-dom'
import moment from 'moment';
import Menu from './menu';

export default class App extends Component {
  constructor(props){
    super(props);
    this._onChange=this._onChange.bind(this);
    this._onpress=this._onpress.bind(this);
    this.state = {
      username:'',
      password: '',
      redirectToReferrer: false,
      todo: [

      ],
      work: '',
      time: ''
    }

  }
  componentDidMount(){
    firebase.database().ref('alltodo/'+this.props.match.params.todo+'/').on('value',(snapshot)=>{
      var currenttodo = snapshot.val();
      console.log(currenttodo);
      if (!currenttodo.map){
            currenttodo = Object.keys(currenttodo).map((k,i)=>currenttodo[k])
        }
      if(currenttodo != null ){
        this.setState({
          todo: currenttodo
        })
      }
    })

  }



  _onChange(event){
    this.setState({
      work: event.target.value,
      time: moment().format("Do MMMM")
    })
    console.log(event.target.value);
  }


  _onpress(event){
    console.log(this.state.work);
    const nextodo = {
      id:this.state.todo.length,
      todowork:this.state.work,
      times:this.state.time
    }
    firebase.database().ref('alltodo/'+this.props.match.params.todo+'/'+nextodo.id).set(nextodo);
    // console.log(this.state.todo);
    // console.log("teng teng");
    var notes=this.refs.notes;
    notes.value ="";
  }
  _unhideform(event){
    var form=document.getElementsByClassName("form-input");
    form[0].style.display="block  ";
  }
  _hideform(event){
    var form=document.getElementsByClassName("form-input");
    form[0].style.display="none";

  }
  _deletedata(i){
    console.log(i);
    const deleltedata={
      id:null,
      todowork:null
    }
    firebase.database().ref('alltodo/'+this.props.match.params.todo+'/'+i).set(deleltedata);
    firebase.database().ref('todoapp/'+i).set(deleltedata);
    // console.log(i)
    // var adaRef = firebase.database().ref('todoapp/'+i);
    // console.log(adaRef);
    // adaRef.remove()
    //   .then(function() {
    //     console.log("Remove succeeded.")
    //   })
    //   .catch(function(error) {
    //     console.log("Remove failed: " + error.message)
    //   });
  }




  render() {


    // console.log(this.state.allwork.length,this.state.allwork[2]);
    const currentList=this.state.todo.map((workr,i)=>{

      if(workr.id=="0"){
        return;
      }
        else{
          return(
              <div className="row" key={i}>
                <div className="col-md-12 col-xs-12">
                  <li className="task-item " >
                    <table cellPadding="0" cellSpacing="0">
                      <tbody>
                        <tr>
                          <td>
                            <span>
                              <button className="delete" onClick={()=>this._deletedata(workr.id)}>
                                  <span className="glyphicon glyphicon-ok del"></span>
                              </button>
                            </span>
                          </td>
                          <td className="form-td" >
                            <div className="formBox">{workr.todowork}
                            <span className="times">{workr.times}</span>

                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                  </div>
              </div>
        )
      }
    })
    return (
      <div>
      <Menu/>
      <div>
        <div className="container todo">
          <div className="row">
            <div className="col-md-9 col-md-offset-1 col-xs-9 col-xs-offset-1 editor">
              <h2 className="view-header">Inbox</h2>
              <div className="items">
                <ul>
                    {currentList}
                  <li className="form-input">
                  <input className="input" ref="notes" onChange={this._onChange} placeholder="Something Todo..."></input>
                  <button className="add" onClick={this._onpress}>Add</button>
                  <button className="remove" onClick={this._hideform}>
                    Cancel
                    </button>
                  </li>
                </ul>
                <div>
                  <button className="add-todo" onClick={this._unhideform}>Add Task</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

        );
      }
    }
