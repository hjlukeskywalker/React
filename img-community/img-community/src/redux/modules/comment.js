import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import firebase from "firebase/app";
import { firestore } from "../../shared/firebase";
import "moment";
import moment from "moment";
import { actionCreators as postActions } from "./post";
const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};
const addCommentFB = (post_id, contents) => {
  return function (dispatch, getState, { history }) {
    const commentDB = firestore.collection("comment");
    const user_info = getState().user.user;
    // comment 하나에 필요한 정보
    let comment = {
      post_id: post_id,
      user_id: user_info.uid,
      user_name: user_info.user_name,
      user_profile: user_info.user_profile,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh-mm-ss"),
    };
    commentDB.add(comment).then((doc) => {
      const postDB = firestore.collection("post");
      const post = getState().post.list.find((l) => l.id === post_id);
      const increment = firebase.firestore.FieldValue.increment(1);
      //post_id를 가진 post의 comment_cnt를 1 증가시키고 리덕스에 댓글을 저장한다.
      comment = {...comment, id:doc.id};
      postDB
        .doc(post_id)
        .update({ comment_cnt: increment })
        .then((_post) =>{
            console.log(_post);
            dispatch(addComment(post_id, comment));
            //(순서 주의) 리덕스 스토어의 comment_cnt 증가는 firestore 반영이 끝나고 난 뒤에 진행한다.
         if (post) {
           //editPostFB가 아니라 editPost인 이유 FB는 위에서 이미 반영시켰기 때문
           dispatch(
             postActions.editPost(post_id, {
               comment_cnt: parseInt(post.comment_cnt) + 1,
             })
           );
         }
        }
        
     
    );

      
    });
  };
};
const getCommentFB = (post_id) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      return;
    }
    const commentDB = firestore.collection("comment");
       // where로 게시글 id가 같은 걸 찾고,
    // orderBy로 정렬해줍니다.
    commentDB
      .where("post_id", "==", post_id)
      .orderBy("insert_dt", "desc")
      .get()
      .then((docs) => {
        let list = [];
        docs.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        dispatch(setComment(post_id, list));
      })
      .catch((err) => {
        console.log("댓글 정보를 가져올 수가 없네요!", err);
      });
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
           // comment는 딕셔너리 구조로 만들어서,
        // post_id로 나눠 보관합시다! (각각 게시글 방을 만들어준다)
        draft.list[action.payload.post_id] = action.payload.comment_list;
      }),
    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list[action.payload.post_id].unshift(action.payload.comment);
    }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  setComment,
  addComment,
  addCommentFB,
};

export { actionCreators };
