import React from "react";
import styled from "styled-components";

const Button = (props)=>{
    const { children, bold, color,size} = props;

    const styles = {bold:bold, color:color, size:size};
    return(
<Btn {...styles}>{children}</Btn>
    );
};

Button.defaultProps = {
children : null,
bold: false,
color: "#222831",
size: "12px",
};

const Btn = styled.button`
width:
color:${(props)=>props.color};
font-size:${(props)=>props.size};
font-weight:${(props)=>(props.bold? "600":"400")};
`;

export default Button;