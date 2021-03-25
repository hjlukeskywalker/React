/*eslint-disable*/
import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { withRouter } from "react-router"; //
import { Route, Switch } from "react-router-dom";

// import {connect} from 'react-redux';
import Calendar from "./Calendar";
import Add from "./Add";
import Modal from "./Modal"

import {connect} from 'react-redux';

const mapStateTopProps = (state) => ({
});

// 이 함수는 값을 변화시키기 위한 액션 생성 함수를 props로 받아오기 위한 함수예요.
const mapDispatchToProps = (dispatch) => ({
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {today:new Date()};
  }

  componentDidMount(){
  }

  render() {

    return (
      
      <APP>
        <Switch>
          <Route path="/" exact render={(props) => (<Calendar today={this.state.today} history={this.props.history}/>)}></Route>
          <Route path="/add" exact component={Add}></Route>
          <Route path="/aa" component={Modal}></Route>
        </Switch>
      </APP>
      
    );
  }
}

const GlobalStyles = createGlobalStyle`
      body {
        background-color: #dce1f2;
  color: #444078;
        /* @import url('https://fonts.googleapis.com/earlyaccess/notosanskr.css');
        font-family: "Noto Sans KR", sans-serif !important; */
      }
    `;

const APP = styled.div`

width:100%;
height:100%;
  flex-direction: column;
  display: flex;
  margin: 0px auto;
  box-sizing: border-box;
  background-color: #dce1f2;
  color: #444078;
`;

export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(App));
