/*eslint-disable*/
import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { withRouter } from "react-router"; //
import { Route, Switch } from "react-router-dom";

// import {connect} from 'react-redux';
import Calendar from "./Calendar";
import Add from "./Add";
import Detail from "./Detail";

class App extends React.Component {
  constructor(props) {
    super(props);

    var calendarDays = [];
    var today = new Date();

    const Days = (today) => {
      var firstDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      ).getDay();
      var endDateOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      ).getDate();

      let cnt = 1;
      for (let i = 0; i < 6; i++) {
        var _days = [];
        for (let j = 0; j < 7; j++) {
          if (cnt > endDateOfMonth) {
            _days.push("");
          } else if (firstDayOfMonth > j && cnt < 7) {
            _days.push("");
          } else {
            _days.push(cnt);
            cnt++;
          }
        }
        calendarDays.push(_days);
      }return calendarDays;
    };

    Days(today);

    this.state = {calendarDays, today};
  }


  componentDidMount(){}

  render() {
    const {month} = this.state;

    return (
      
      <APP>
        <Switch>
          <Route path="/" exact render={(props) => (<Calendar calendarDays={this.state.calendarDays} today={this.state.today} history={this.props.history}/>)}></Route>
          <Route path="/add" exact component={Add}></Route>
          <Route path="/detail" exact component={Detail}></Route>
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

export default withRouter(App);
