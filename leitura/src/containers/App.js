import React, { Component } from 'react';
import '../App.css';
import { fetchCategories, fetchPosts } from '../utils/blogAPI';
import Header from '../components/Header'
import Posts from '../containers/Posts'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Posts />
      </div>
    );
  }
}

export default App;
