//action 생성을 편하게 할 수 있게 도와주는 패키지
import { createAction, handleActions } from "redux-actions";
//reducer 불변성 유지를 위한 패키지
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import moment from "moment";

//action type
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

//action creator
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

//reducer가 사용할 initialState
const initialState = {
  list: [],
};

//post마다 필요한 initialState
const initialPost = {
  id: 0,
  //user 정보는 리덕스에서 받아옴.
//   user_info: {
//     user_name: "Gomi",
//     user_profile:
//       "https://yt3.ggpht.com/ytc/AAUvwnhyh4Zo58irFscLyvbR71t4-MAWYAu1GyDy2LLy=s900-c-k-c0x00ffffff-no-rj",
//   },
  image_url:
    "https://i.pinimg.com/564x/e5/6b/e5/e56be50d03a9cf253c52c90b0b302ea4.jpg",
  contents: "맛있겠네요!",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

//middleware
const addPostFB = (contents="")=>{
    return function(dispatch, getState, {history}){
        const postDB = firestore.collection("post");

        const _user=getState().user.user;
        const user_info = {
            user_name:_user.user_name,
            user_id:_user.uid,
            user_profile:_user.user_profile
        };
        const _post = {
            ...initialPost,
            contents:contents,
            insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
            //한번 더 기재하는 이유는 addPostFB가 실행되는 시점의 시간이 필요하기 때문
        };
        postDB.add({...user_info, ..._post}).then((doc)=>{
            
            let post = {user_info, ..._post, id:doc.id};
            dispatch(addPost(post))
            history.replace("/");
        }).catch((err)=>{
            console.log("POST작성에 실패했어요!", err);
        });
// ~~.add({추가할 정보})
    }
}
const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    postDB.get().then((docs) => {
      let post_list = [];
      docs.forEach((doc) => {
        let _post = doc.data();

        //firestore 내 자료형태를 Post.defaultProps와 일치시켜주는 절차
        //딕셔너리의 키값을 배열로 만들어준다.
        let post = Object.keys(_post)
        .reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info:{} }
        );
        post_list.push(post)
      });

      console.log(post_list);
      dispatch(setPost(post_list));
    });
  };
};

//reducer
export default handleActions(
  {
    [SET_POST]: (
      state,
      action //처리할 동작 명시
    ) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
    [ADD_POST]: (state, action) => produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
    }),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB
};

export { actionCreators };
