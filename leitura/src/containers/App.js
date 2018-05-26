import React, { Component } from 'react';
import '../App.css';
import Header from '../components/Header';
import PostsList from '../components/PostsList';
import { Switch, Route, withRouter } from 'react-router-dom';

class App extends Component {

  render() {
    return (

      <div>
        <div className="App">

          <Header />
          <Switch>
            <Route exact path='/' component={PostsList} />
            <Route exact path='/:category' component={PostsList} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
