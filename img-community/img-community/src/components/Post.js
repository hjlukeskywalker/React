import React from "react";
import { Button, Grid, Image, Text } from "../elements";
import {history} from "../redux/configureStore";
const Post = (props) => {
  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.user_info.user_profile}></Image>
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>

          <Grid is_flex width="auto">
            <Text>{props.insert_dt}</Text>
            {props.is_me && ( //PostList에서 is_me 옵션을 선언해둠.
              <Button width="auto" padding="4px" margin="4px" _onClick={()=>{
                history.push(`/write/${props.id}`);
              }}>
                수정
              </Button>
            )}
          </Grid>
        </Grid>

        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>

        <Grid>
          <Image shape="rectangle" src={props.image_url} />
        </Grid>

        <Grid padding="16px">
          <Text margin="0" bold>
            댓글 {props.comment_cnt}개
          </Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
Post.defaultProps = {
  user_info: {
    user_name: "Gomi",
    user_profile:
      "https://yt3.ggpht.com/ytc/AAUvwnhyh4Zo58irFscLyvbR71t4-MAWYAu1GyDy2LLy=s900-c-k-c0x00ffffff-no-rj",
  },
  image_url:
    "https://i.pinimg.com/564x/e5/6b/e5/e56be50d03a9cf253c52c90b0b302ea4.jpg",
  contents: "맛있겠네요!",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
};

export default Post;
