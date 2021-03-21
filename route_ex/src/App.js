import React from "react";
import {render} from "react-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Home from "./Home"
import Dog from "./Dog"
import Cat from "./Cat"


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  
  }

  render(){
    return(
      
      <div className="App">
        <Router>
      <Route exact path="/" component={Home}/>
      <Route path="/cat" component={Cat}/>
      <Route path="/dog" component={Dog}/>
      </Router>
      </div>
      
    );
  }
}
export default App;