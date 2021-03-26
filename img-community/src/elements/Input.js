import React from "react";
import styled from "styled-components";

const Text = (props)=>{
    const { children, bold, color,size} = props;

    const styles = {bold:bold, color:color, size:size};
    return(
<P {...styles}>{children}</P>
    );
};

Text.defaultProps = {
children : null,
bold: false,
color: "#222831",
size: "14px",
};

const P = styled.p`
color:${(props)=>props.color};
font-size:${(props)=>props.size};
font-weight:${(props)=>(props.bold? "600":"400")};
`;

export default Text;