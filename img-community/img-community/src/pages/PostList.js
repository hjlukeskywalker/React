import React from "react";
import Post from "../components/Post";
import {useSelector, useDispatch} from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post";
import InfinityScroll from "../shared/infinityScroll";
import {Grid} from "../elements";

const PostList = (props) => {

    const dispatch = useDispatch();
    const post_list = useSelector((state)=> state.post.list);
    const user_info = useSelector((state)=>state.user.user);
    const is_loading = useSelector((state)=>state.post.is_loading);
    const paging = useSelector((state)=> state.post.paging);
    const {history} = props;
    
    //firebase에 한 번만 요청
    React.useEffect(()=>{
       
        if(post_list.length < 2){
            dispatch(postActions.getPostFB());
        }
      

    }, []);
// console.log(paging.data());
    return(
<React.Fragment>
    <Grid bg={"#FAFAFA"} padding="20px 0">
 
    <InfinityScroll
     callNext={() => {
        dispatch(postActions.getPostFB(paging.next));
        console.log("PostList", paging.next? true:false);
      }}
      is_next={paging.next? true:false}
      loading={is_loading}

    >
    {post_list.map((p,idx)=>{
        
        //user_info가 없는 경우인 비로그인 상태를 필터링하기위해 ?. 옵셔널체이닝
        if(p.user_info.user_id === user_info?.uid){
            return(
                <Grid key={p.id} bg={"#ffffff"}>
                <Post {...p} is_me></Post>
                </Grid>
            );
        }else{
            return(
                <Grid key={p.id}  bg={"#ffffff"}
                >
                <Post {...p}></Post>
                </Grid>
            );
        } 
    })}
    </InfinityScroll>
    </Grid>
</React.Fragment>
    );

}

export default PostList;