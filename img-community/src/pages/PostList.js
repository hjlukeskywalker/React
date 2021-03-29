import React from "react";
import Post from "../components/Post";
import {useSelector, useDispatch} from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post";
const PostList = (props) => {

    const dispatch = useDispatch();
    const post_list = useSelector((state)=> state.post.list);

    console.log(post_list);

    //firebase에 한 번만 요청
    React.useEffect(()=>{
        if(post_list.length ===0){
            dispatch(postActions.getPostFB());
        }
      

    }, [])

    return(
<React.Fragment>
    <Post/>
    {post_list.map((p,idx)=>{
        return(
            <Post key={p.id} {...p}></Post>
        );
    })}
</React.Fragment>
    );

}

export default PostList;