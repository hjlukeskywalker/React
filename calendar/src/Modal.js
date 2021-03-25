/*eslint-disable*/
import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";

const Modal = ({isOpen, close}) =>{

  const schedules = useSelector((state) => state.calendar.schedules);
  console.log(schedules);
  console.log(isOpen);

 

  return(
    
      <div >
      
      <p>{1? "완료되었어요!":"예정되어 있어요!"}</p>
    </div>
  );
}

const Style = styled.div`
background-color:##BEBDDB;
border: 5px solid #fff;
margin:0;
`;



export default Modal;