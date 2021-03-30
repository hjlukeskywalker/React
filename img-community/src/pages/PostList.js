import React from "react";
import Post from "../components/Post";
import {useSelector, useDispatch} from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post";
const PostList = (props) => {

    const dispatch = useDispatch();
    const post_list = useSelector((state)=> state.post.list);
    const user_info = useSelector((state)=>state.user.user);

    //firebase에 한 번만 요청
    React.useEffect(()=>{
        if(post_list.length ===0){
            dispatch(postActions.getPostFB());
        }
      

    }, []);

    return(
<React.Fragment>
    <Post/>
    {post_list.map((p,idx)=>{
        //user_info가 없는 경우인 비로그인 상태를 필터링하기위해 ?. 옵셔널체이닝
        if(p.user_info.user_id === user_info?.uid){
            return(
                <Post key={p.id} {...p} is_me></Post>
            );
        }else{
            return(
                <Post key={p.id} {...p}></Post>
            );
        }
        
    })}
</React.Fragment>
    );

}

export default PostList;