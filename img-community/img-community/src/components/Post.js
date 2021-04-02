import React from "react";
import { Button, Grid, Image, Text } from "../elements";
import { history } from "../redux/configureStore";
import Heart from "./Heart";
import EditIcon from "@material-ui/icons/Edit";
import {firestore} from "../shared/firebase";
import firebase from "firebase/app";
import {useSelector, useDispatch} from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post";


const Post = (props) => {
  const dispatch=useDispatch();
  return (
    <React.Fragment>
      <Grid margin="20px 0">
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image
              shape="circle"
              src={
                props.user_info.user_profile
                  ? props.user_info.user_profile
                  : "https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg"
              }
            ></Image>
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>

          <Grid is_flex width="auto">
            <Text>{props.insert_dt}</Text>
            {props.is_me && ( //PostList에서 is_me 옵션을 선언해둠.
              <Button
            
                text="edit"
                width="auto"
                padding="1px 4px"
                margin="0 0 0 7px"
                _onClick={() => {
                  history.push(`/write/${props.id}`);
                }}
              >
                {/* <EditIcon fontSize="small"/> */}
              </Button>
            )}
          </Grid>
        </Grid>

        {props.layout_type === "right" ? (
          <Grid
            is_flex
            _onClick={() => {
              history.push(`/post/${props.id}`);
            }}
          >
            <Grid center>
              <Text>{props.contents}</Text>
            </Grid>
            <Grid width="50%">
              <Image shape="rectangle" src={props.image_url} />
            </Grid>
          </Grid>
        ) : props.layout_type === "left" ? (
          <Grid
            is_flex
            _onClick={() => {
              history.push(`/post/${props.id}`);
            }}
          >
            <Grid width="50%">
              <Image shape="rectangle" src={props.image_url} />
            </Grid>
            <Grid center>
              <Text>{props.contents}</Text>
            </Grid>
          </Grid>
        ) : (
          <React.Fragment>
            <Grid
              padding="16px"
              _onClick={() => {
                history.push(`/post/${props.id}`);
              }}
            >
              <Text>{props.contents}</Text>
            </Grid>

            <Grid
              _onClick={() => {
                history.push(`/post/${props.id}`);
              }}
            >
              <Image shape="rectangle" src={props.image_url} />
            </Grid>
          </React.Fragment>
        )}

        <Grid padding="16px" is_flex>
          <Grid
            _onClick={() => {
              history.push(`/post/${props.id}`);
            }}
          >
            {props.like_cnt && (
              <Text margin="0" bold>
                좋아요 {props.like_cnt}개
              </Text>
            )}
            {props.comment_cnt != 0 && (
              <Text margin="0" bold>
                댓글 {props.comment_cnt}개
              </Text>
            )}
          </Grid>
          <Grid width="auto" _onClick={(e)=>{
             e.preventDefault();
             e.stopPropagation();
             console.log("좋아요!")
             dispatch(postActions.toggleLikeFB(props.id));
          }} is_like={props.is_like}>
          <Heart/>
          </Grid>
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
  is_like: false,
};

export default Post;
