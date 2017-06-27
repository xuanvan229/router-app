import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as firebase from 'firebase'

var config = {
   apiKey: "AIzaSyClEzyh8mLYAuNQ3Tlq46QC3GbyLGjXiEA",
   authDomain: "react-todo-a4383.firebaseapp.com",
   databaseURL: "https://react-todo-a4383.firebaseio.com",
   projectId: "react-todo-a4383",
   storageBucket: "react-todo-a4383.appspot.com",
   messagingSenderId: "790621731947"
 };
 firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
