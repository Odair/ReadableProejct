import React, { Component } from 'react';
import '../App.css';
import Header from '../components/Header'
import PostsList from '../components/PostsList'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <PostsList />
      </div>
    );
  }
}

export default App;
