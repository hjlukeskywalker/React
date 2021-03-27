import React from "react";
import styled from "styled-components";
import { Button, Grid, Text } from '../elements';

const Header = (props) => {
    return (
<React.Fragment>
<Grid>
    <Grid>
        <Text>하이</Text>
    </Grid>
    <Grid>
        <Button text="로그인"></Button>
        <Button text="회원가입"></Button>
    </Grid>
</Grid>
</React.Fragment>
    );
}
Header.defaultProps = {}

export default Header;