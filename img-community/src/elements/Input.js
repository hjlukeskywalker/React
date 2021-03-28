import React from "react";

import {Text, Grid} from "./index";
import styled from "styled-components";

const Input = (props)=>{
    const { placeholder, label, _onChange, type} = props;

    return(
        <React.Fragment>
            <Grid>
            <Text margin="0px">{label}</Text>
<ElInput type={type} placeholder={placeholder} onChange={_onChange}/>

            </Grid>

</React.Fragment>
    );
};

Input.defaultProps = {
label: '텍스트',
placeholder: '텍스트를 입력해주세요.',
type: "text",
_onChange:()=>{},
};

const ElInput = styled.input`
  border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`;

export default Input;