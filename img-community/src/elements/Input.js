import React from "react";

import {Text, Grid} from "./index";
import styled from "styled-components";

const Input = (props)=>{
    const { placeholder, label, _onChange, type, multiline} = props;

if(multiline){
    return(
        <Grid>
               {label && <Text margin="0px">{label}</Text>}
              <ElTextarea rows={10} placeholder={placeholder} onChange={_onChange}></ElTextarea>
        </Grid>
    );
}

    return(
        <React.Fragment>
            <Grid>
            {label && <Text margin="0px">{label}</Text>}
<ElInput type={type} placeholder={placeholder} onChange={_onChange}/>

            </Grid>

</React.Fragment>
    );
};

Input.defaultProps = {
label: false,
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

const ElTextarea = styled.textarea`
 border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`;

export default Input;