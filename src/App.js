import React, { Component } from "react";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import Gallery from "./components/gallery";
import Detail from "./components/detail";
import Details from "./components/details";
import Search from "./components/search";

class App extends Component {
  render() {
    return (
      <div id="root">
        <Router>
          <div>
            <Route exact path="/" component={Gallery} />
            <Route path="/detail/:id" component={Detail} />
            <Route path="/details/:id" component={Details} />
            <Route path="/search" component={Search} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
