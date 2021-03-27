import React from "react";
import {Grid, Image, Text} from "../elements";

const Post = (props) => {

    return (
        <React.Fragment>
            <Grid is_flex padding="16px">
                <Grid is_flex width="auto">
                <Image shape="circle" src={props.user_info.user_profile}></Image>
                <Text bold></Text>
                <Text bold>{props.user_info.user_name}</Text>
                </Grid>
           <Grid is_flex width="auto">
               <Text>{props.insert_dt}</Text></Grid>
            </Grid>
            <Grid padding="16px">
                <Text>{props.contents}</Text>
            </Grid>
            <Grid>
                <Image shape="rectangle" src={props.image_url}/>
            </Grid>
            <Grid padding="16px">
                <Text bold>댓글 {props.comment_cnt}개</Text>
            </Grid>
       
        </React.Fragment>
    )
};
Post.defaultProps = {
    user_info: {
      user_name: "Gomi",
      user_profile: "https://yt3.ggpht.com/ytc/AAUvwnhyh4Zo58irFscLyvbR71t4-MAWYAu1GyDy2LLy=s900-c-k-c0x00ffffff-no-rj",
    },
    image_url: "https://i.pinimg.com/564x/e5/6b/e5/e56be50d03a9cf253c52c90b0b302ea4.jpg",
    contents: "맛있겠네요!",
    comment_cnt: 10,
    insert_dt: "2021-02-27 10:00:00",
  };

export default Post;