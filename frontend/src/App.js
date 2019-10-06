import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import { CustomNavbar } from './customnavbar.js';

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
        tag_to_call = <p>Searching Internet</p>
        break;
      case "search_local":
        tag_to_call = <p>Searching Local</p>
        break;
    }

    return (<div>
      <CustomNavbar movieSearch={this.movieSearch} localSearch={this.localSearch} />
      {tag_to_call}
    </div>);
  }
}

export default App;
