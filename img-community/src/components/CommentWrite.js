import React from "react";
import {Grid, Text, Button, Input, Image} from "../elements";

const CommentWrite = () =>{
    return(
<React.Fragment>
    <Grid padding="16px" is_flex>
        <Input placeholder="댓글 내용을 입력해주세요 :)"></Input>
        <Button width="50px" margin="0 2px">등록</Button>
    </Grid>
</React.Fragment>
    );
}
export default CommentWrite;