import React from "react";
import {actionCreators as commentActions} from "../redux/modules/comment";
import {useSelector, useDispatch} from "react-redux";
import {Grid, Text, Button, Input, Image} from "../elements";

const CommentWrite = (props) =>{
    const dispatch = useDispatch();
    // 댓글 내용을 저장할 공간
    const [comment_text, setCommentText] = React.useState();
    const {post_id} = props;

    const onChange = (e)=>{
        setCommentText(e.target.value);
    }

    const write = ()=>{
        dispatch(commentActions.addCommentFB(post_id, comment_text));
        setCommentText("");
    }
    return(
<React.Fragment>
    <Grid padding="16px" is_flex>
        <Input onSubmit={write} is_Submit _onChange={onChange} value={comment_text} placeholder="댓글 내용을 입력해주세요 :)"></Input>
        <Button _onClick={write} width="50px" margin="0 2px">등록</Button>
    </Grid>
</React.Fragment>
    );
}
export default CommentWrite;