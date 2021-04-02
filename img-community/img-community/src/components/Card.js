import React from "react";
import { Grid, Text, Image } from "../elements";
import {history} from "../redux/configureStore";
const Card = (props) => {
    const {image_url, user_name, post_id, act_type} = props;
    console.log(props);
  return (
    <Grid padding="16px" is_flex bg="#ffffff" margin="8px 0"
    _onClick={() => {history.push(`/post/${post_id}`);}}>
      <Grid width="auto" margin="0 8px 0 0">
        <Image shape="square" size={85} src={image_url}/>
      </Grid>
      <Grid>
        <Text>
          <b>{user_name}</b>님이 {
            act_type==="like"?
            "좋아요를 눌렀습니다.":
            "게시글에 댓글을 남겼습니다."
          }
        </Text>
      </Grid>
    </Grid>
  );
};
Card.defaultProps = {
    //""공백으로 선언해두어도 props가 없어 발생하는 오류는 방지한다.
    image_url:"https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg",
    user_name:"",
    post_id:null,
}

export default Card;