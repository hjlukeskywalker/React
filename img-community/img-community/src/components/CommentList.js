import React from "react";
import {Grid, Text, Button, Input, Image} from "../elements";
import user from '../redux/modules/user';
import {useDispatch, useSelector} from "react-redux";
import {actionCreators as commentActions} from "../redux/modules/comment";

const CommentList = (props) =>{
    const dispatch = useDispatch();
    const comment_list= useSelector(state=>state.comment.list);
    const {post_id} = props;
    React.useEffect(()=>{
        if(!comment_list[post_id]){
            dispatch(commentActions.getCommentFB(post_id));
            
        }
    },[]);

    if(!comment_list[post_id] || !post_id){
        return null;
    }
    return(
<React.Fragment>
    <Grid padding="16px">
        {comment_list[post_id].map(c=>{
            return(
                <CommentItem key={c.id} {...c}/>
            );
        })}
 </Grid>
</React.Fragment>
    );
};

CommentList.defaultProps={
    post_id:null,

}
export default CommentList;

const CommentItem = (props)=>{

    const {
        user_name,
        user_profile,
        user_id,
        post_id,
        contents,
        insert_dt,
    } = props;

    return(
        <React.Fragment>
<Grid is_flex>
<Grid is_flex width="auto">
                <Image shape="circle" src={user_profile}></Image>
                <Text bold>{user_name}</Text>
                </Grid>
                <Grid is_flex margin="0 4px" >
                    <Text margin="0">{contents}</Text>
                    <Text margin ="0" >{insert_dt}</Text>
                </Grid>
</Grid>
        </React.Fragment>
    );
}

CommentItem.defaultProps = {
    user_name: "dori",
    user_profile: "https://yt3.ggpht.com/ytc/AAUvwnhyh4Zo58irFscLyvbR71t4-MAWYAu1GyDy2LLy=s900-c-k-c0x00ffffff-no-rj",
    user_id:"",
    post_id:1,
    insert_dt: "2021-03-29 10:00:00",
    contents:"퍼가요~❤",
}
//export 하지 않아도 상관없음.