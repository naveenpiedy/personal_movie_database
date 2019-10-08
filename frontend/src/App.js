import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Helmet from 'react-helmet';

import { CustomNavbar } from './customnavbar.js';
import { SearchInternet } from './searchInternet.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.movieSearch = this.movieSearch.bind(this);
    this.localSearch = this.localSearch.bind(this);
    this.state = {
      searchState: "home",
    }
  }
  movieSearch() {
    this.setState({
      searchState: "search_internet"
    })
  }

  localSearch() {
    this.setState({
      searchState: "search_local"
    })
  }

  render() {
    var tag_to_call = null;
    switch (this.state.searchState) {
      case "home":
        tag_to_call = <p>Home</p>;
        break;
      case "search_internet":
        tag_to_call = <SearchInternet />
        break;
      case "search_local":
        tag_to_call = <p>Searching Local</p>
        break;
    }

    return (<div>
      <Helmet bodyAttributes={{style: 'background-color : #2f3236'}}/>
      <CustomNavbar movieSearch={this.movieSearch} localSearch={this.localSearch} />
      {tag_to_call}
    </div>);
  }
}

export default App;
