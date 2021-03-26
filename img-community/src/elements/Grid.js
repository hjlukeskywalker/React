import React from "react";
import styled from "styled-components";

const Grid = (props) => {
    const { is_flex, width, margin, padding, bg, children } = props;
  
    const styles = {
        is_flex: is_flex,
        width: width,
        margin: margin,
        padding: padding,
        bg: bg,
    };
    return (
      <React.Fragment>
        <GridBox {...styles}>{children}</GridBox>
      </React.Fragment>
    );
  };

//props값이 없을 때 생길 오류 방지
Grid.defaultProps = {
    chidren: null,
    is_flex: false,
    width: "100%",
    padding: false,
    margin: false,
    bg: false,
  };

const GridBox = styled.div`
width : ${(props)=> props.width};
height: 100%;
bos-sizing: border-box;
//width와의 차이점: width는 props가 존재하지 않아도 100%라는 기본값이 주어지지만 아래의 속성은 props가 없으면 아예 주지 않을 속성이다.
${(props)=>(props.padding? `padding: ${props.padding};`:"")}
${(props)=> (props.margin? `margin: ${props.margin};`: "")}
${(props)=>(props.bg? `background-color: ${props.bg};`:"")}
${(props)=>
props.is_flex? `display:flex; align-items:center; justify-content:space-between`:""}

`;

export default Grid;