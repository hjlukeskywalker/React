import React from "react";
import styled, { keyframes, css } from "styled-components";

const Calendar = (props) => {
  console.log(props)
  const new_month = props.calendarDays.map((week, idx) => {
    return (
      <Row key={week}>
        {week.map((day, idx) => {
          return (
            <div key={day}>
              <span color={idx == 0 || idx == 6 ? "pink" : "#787c9c"}>
                {day}
              </span>
            </div>
          );
        })}
      </Row>
    );
  });

  var thismonth = props.today.getMonth();
  var year = props.today.getFullYear();
  let monList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [month, setCount] = React.useState(thismonth);

  const nextMonth = () => {
    setCount((month) => month + 1);
    console.log(month);
  };

  const prevMonth = () => {
    setCount((month) => month - 1);
  };

  return (
    <Container>
      <Header>
        <button onClick={prevMonth}>◀</button>
        <span>
          {monList[month]} {year}
        </span>
        <button onClick={nextMonth}>▶</button>
      </Header>
      <Date>
        <Day>
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </Day>
        {new_month}
      </Date>
     
        <FloatBtn1>완료 일정</FloatBtn1>
        <FloatBtn2
          onClick={() => {
            props.history.push("/add");
          }}
        >
          일정 추가
        </FloatBtn2>
     
    </Container>
  );
};
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  align-items: center;
  /* justify-content:center; */
  flex-direction: column;
  display: flex;
`;
const Date = styled.div`
  background-color: #fff;
  width: 93%;
  height: 81%;
  padding: 8px 10px;
  box-sizing: border-box;
  color: #787c9c;
  margin: 0;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 5px 20px;
  box-sizing: border-box;
  font-weight: 600;
  width: 100%;
  height: 14%;
  font-size:1.2em;
  & button {
    margin: 0 25px;
    cursor: pointer;
    outline: none;
    display: inline-flex;
    background: transparent;
    border: none;
    font-size: 20pt;
    color: #444078;
    padding: 4px;
    &:hover {
      color: #fff;
    }
    &:active {
    }
  }
`;

const Day = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  & div {
    min-width: 13%;
    max-height: 5%;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    box-sizing: border-box;
  }
`;

const Row = styled.div`
  width: 100%;
  height: 16%;
  display: flex;
  justify-content: space-between;

  & div {
    width: 13%;
    height: 100%;
    font-size: 14px;
    font-weight: 600;
    box-sizing: border-box;
  }
  & span {
    margin: 3px 0 0 3px;
    color: ${(props) => props.color};
    font-size: 0.9em;
  }
`;
const FloatBtn1 = styled.button`
box-shadow: 0 1px 2px 0 #777;
position:fixed;
z-index:999;
right:6%;
bottom:18%;
width:30%;
min-width:90px;
max-width:150px;
height:30px;
margin: auto 0px;
background-color:#fff;
border:none;
border-radius:20px;
font-weight:600;
color:#4D4887;
cursor: pointer;
outline: none;
`;
const FloatBtn2 = styled.button`
box-shadow: 0 1px 2px 0 #777;
position:fixed;
z-index:999;
right:6%;
bottom:10%;
width:30%;
min-width:90px;
max-width:150px;
height:30px;
margin: auto 0px;
background-color:#fff;
border:none;
border-radius:20px;
font-weight:600;
color:#4D4887;
cursor: pointer;
outline: none;
`;

export default Calendar;
