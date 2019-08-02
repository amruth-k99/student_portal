import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import Events from './components/Events';
import './App.css';
import {provider } from 'react-redux';
import store from './store';

class App extends Component{
  render(){
    return (
      <Provider store={store}>
      <div className="App">
        <AppNavbar/>
        <Events/>
      </div>
      </Provider>
    );
  }
}



export default App;
