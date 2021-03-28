import React from "react";
import styled from "styled-components";
import { Button, Grid, Text } from '../elements';
import { getCookie, deleteCookie } from '../shared/Cookie';
import {useSelector, useDispatch} from "react-redux";
import {actionCreators as userAction} from "../redux/modules/user"
import {history} from "../redux/configureStore";

const Header = (props) => {
const dispatch = useDispatch();
const is_login = useSelector((state)=> state.user.is_login);

if(is_login){ 
    return(
    <React.Fragment>
<Grid is_flex padding="16px">
<Grid>
    <Text>하이</Text>
</Grid>
<Grid is_flex>
    <Button text="내 정보" ></Button>
    <Button text="알림"></Button>
    <Button text="로그아웃" _onClick={() => {
        dispatch(userAction.logOut({}));}} ></Button>
</Grid>
</Grid>
</React.Fragment>
);}
   

    return (
<React.Fragment>
<Grid is_flex padding="16px">
    <Grid>
        <Text>하이</Text>
    </Grid>
    <Grid is_flex>
        <Button text="로그인" _onClick={()=>{
            history.push("/login");
        }}></Button>
        <Button text="회원가입" _onClick={()=>{
            history.push("/signup");}}></Button>
    </Grid>
</Grid>
</React.Fragment>
    );
}
Header.defaultProps = {}

export default Header;