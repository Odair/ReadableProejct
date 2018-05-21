import React, { Component } from 'react';
import '../App.css';
import { fetchCategories, fetchPosts } from '../utils/blogAPI';
import Header from '../components/Header'

class App extends Component {

  componentDidMount() {
    fetchCategories();
    fetchPosts();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
