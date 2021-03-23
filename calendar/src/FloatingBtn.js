import React from "react";
import styled from "styled-components";

const FloatingBtn = (props) =>{
    console.log(props.history);
    return(
        <Footer>
            <button>완료 일정</button>
            <button onClick={()=>{props.history.push("/add");}}>일정 추가</button>
        </Footer>
    );
}

const Footer= styled.div`
right:0px;
bottom:0px;
min-height:15%;
padding: 5px 20px;
width:100%;
display:flex;
flex-direction:column;
justify-content:flex-end;
align-items:flex-end;
box-sizing:border-box;

&>button{
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
}

}
`;

export default FloatingBtn;