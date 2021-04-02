import React, { Children } from "react";
import styled from "styled-components";

const Button = (props)=>{
    const {bold, bg, color, text, _onClick, is_float, children, margin, width, padding} = props;

    const styles={bold:bold, margin:margin, width:width, padding:padding, bg:bg, color:color};

    if(is_float){
        return(
            <React.Fragment>
                <FloatButton {...styles} onClick={_onClick}>{text? text:children}</FloatButton>
            </React.Fragment>
               );
    }
 

    return(
        <React.Fragment>
        <ElButton {...styles} onClick={_onClick}>{text? text:children}</ElButton>
      </React.Fragment>
    );
};

Button.defaultProps = {
    text: false,
    children: null,
    _onClick: () => {},
    is_float:false,
    margin:false,
    width:"100%",
    padding: "12px 0px",
    bg:"#212121",
    color:"#ffffff",
    
    
};


const ElButton = styled.button`
    width: ${(props)=>props.width};
    background-color:${(props)=>props.bg};
    color: ${(props)=>props.color};
    padding: ${(props)=> props.padding};
    box-sizing: border-box;
    border: none;
    ${(props)=>(props.margin? `margin: ${props.margin};`:"")}
    ${(props)=>(props.bold? `font-weight: 600;`:"")}
`;

const FloatButton = styled.button`
width:50px;
height:50px;
background-color:#212121;
color:#ffffff;
padding:16px;
box-sizing:border-box;
font-size:36px;
font-weight:800;
position:fixed;
bottom:50px;
right:16px;
text-align:center;
border:none;
border-radius:50px;
display:flex;
align-items:center; 
justify-content:center;
background-color:#FFD600;
;

`;

export default Button;