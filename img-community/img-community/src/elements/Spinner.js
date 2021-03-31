import React from "react";
import styled from "styled-components";

const Spinner = (props) => {
  const { type, size, is_dim } = props;

  return (
    <React.Fragment>
      <SpinnerWrap type={type} is_dim={is_dim}>
        <SpinnerSvg size={size} />
      </SpinnerWrap>
    </React.Fragment>
  );
};

Spinner.defaultProps = {
  type: "inline", // inline, page
  is_dim: false,
  size: 60,
};

const SpinnerWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  ${(props) =>
    props.type === "page"
      ? `position: fixed;
        height: 95vh;
        top: 0;
        left: 0;
        padding: 0;
        zIndex: 9999;`
      : ``}
  ${(props) =>
    props.is_dim
      ? `
     background: rgba(0,0,0,0.4); 
     height: 100vh;
  `
      : ``}
`;

const SpinnerSvg = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url(\"https://static.thenounproject.com/png/1791459-200.png");
  background-size: var(--size);
`;

export default Spinner;