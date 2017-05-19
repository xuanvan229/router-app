import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyAOZFkMgDohk1woS6WodZsYezb0D5TCMHs",
  authDomain: "todoapp-646d6.firebaseapp.com",
  databaseURL: "https://todoapp-646d6.firebaseio.com",
  projectId: "todoapp-646d6",
  storageBucket: "todoapp-646d6.appspot.com",
  messagingSenderId: "736097244303"
};
firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
