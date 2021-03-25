import React from "react";
import {useState, useDispatch, useRef} from "react-redux";
import styled from "styled-components";
import Schedule from './Schedule';
import {addSchedule} from "./redux/modules/calendar";

const Add = (props)=>{

    const dispatch = useDispatch();

    const checkSchedule = () => {
            var schedule = document.getElementById('scheduleInput').value;
            var date = document.getElementById('scheduleDate').value;
            if(schedule!=0 && date!=0){
            dispatch(addSchedule(date,schedule));
            console.log(date, schedule)
            alert("저장되었습니다 😊")
            props.history.goBack();
        }else{alert("정보를 입력해주세요 ☺")

        }
    };
    
    return(
        <AddContainer>
            <InputBox>
            <h2>새로운 일정</h2>
            <input type="text" id="scheduleInput" max="9999-12-31" style={{height:30+'%'}}></input>
            <input type="datetime-local" id="scheduleDate"></input>
            </InputBox>
            <BtnBox>
            <button onClick={props.history.goBack}>뒤로</button><button onClick={checkSchedule}>저장</button>
            </BtnBox>
        </AddContainer>
    );


}
const AddContainer = styled.div`
width:100vw;
height:100vh;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`;

const InputBox = styled.div`
width:70%;
height:75%;
margin-top:3%;
background-color:#fff;
border-radius:7px;
display:flex;
flex-direction:column;
justify-content:space-evenly;
align-items:center;
& h2{
 margin:0;
}
& input{
    width:80%;
    border-radius: 5px;
    border: 1px solid #888;
    &:focus {
      border: 1px solid #a673ff;
    }
    
}
`;
const BtnBox = styled.div`
margin-top:3%;
box-sizing:border-box;
display:flex;
width:70%;
height:13%;
justify-content:space-evenly;
align-items:center;
& button{
    box-shadow: 0 1px 2px 0 #777;
width:35%;
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
}
`;



export default Add;