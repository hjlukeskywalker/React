import React from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import Permit from "../shared/Permit";
import {useDispatch, useSelector} from "react-redux";

import {actionCreators as postActions} from "../redux/modules/post";

const PostDetail = (props) =>{
    const dispatch = useDispatch();
    const id = props.match.params.id;
    const user_info = useSelector((state)=>state.user.user);
    const post_list = useSelector(store => store.post.list);
    const post_idx = post_list.findIndex(p=> p.id ===id);
    const post = post_list[post_idx];
    
    React.useEffect(()=>{

        //포스트를 찾는 과정
        //getPost해온 자료에 post가 존재하면 절차 종료 후 해당 값 사용
        if(post){
            return;
        }
        dispatch(postActions.getOnePostFB(id));
        //getPost로 들어온 목록에 없다면 firestore에서 단일데이터 가져와서 사용
        

    }, [])
    return(
<React.Fragment>
   {post && <Post {...post} is_me={post.user_info.user_id === user_info?.uid}></Post>}
    <Permit><CommentWrite post_id={id}/></Permit>
    <CommentList post_id={id}/>
</React.Fragment>
    );
}
export default PostDetail;