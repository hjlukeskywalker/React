import React from "react";

import { Text, Grid } from "./index";
import styled from "styled-components";

const Input = (props) => {
  const { placeholder, is_Submit, label, _onChange, type, multiline, value } = props;

  if (multiline) {
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElTextarea
          value={value}
          rows={10}
          placeholder={placeholder}
          onChange={_onChange}
        ></ElTextarea>
      </Grid>
    );
  };

  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        {is_Submit?
        <ElInput type={type} value={value} placeholder={placeholder} onChange={_onChange} />:
        <ElInput type={type} placeholder={placeholder} onChange={_onChange} />}
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  _onChange: () => {},
  value: "",
  is_Submit:false,
};

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Input;
