import React from "react";
import{withRouter} from "react-router";//
import {Route, Switch} from "react-router-dom";
// import {connect} from 'react-redux';

import Calendar from "./Calendar"

class App extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    return(
      <div className="App">
        <Switch>
          <Route path="/" exact component={Calendar}></Route>
        </Switch>

      </div>
    );
  }
}


export default withRouter(App);