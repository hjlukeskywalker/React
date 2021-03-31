//action 생성을 편하게 할 수 있게 도와주는 패키지
import { createAction, handleActions } from "redux-actions";
//reducer 불변성 유지를 위한 패키지
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";
import { actionCreators as imageActions } from "../modules/image";
import { size } from 'lodash';

//action type
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";

//action creator
const setPost = createAction(SET_POST, (post_list,paging) => ({ post_list,paging }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST,(post_id,post)=>({post_id,post}));

const loading = createAction(LOADING, (is_loading) => ({is_loading}));
//reducer가 사용할 initialState
const initialState = {
  list: [],
  paging:{start:null, next:null, size: 3},
  is_loading:false,
};
//post마다 필요한 initialState
const initialPost = {
  //user 정보는 리덕스에서 받아옴.
  image_url:
    "https://i.pinimg.com/564x/e5/6b/e5/e56be50d03a9cf253c52c90b0b302ea4.jpg",
  contents: "맛있겠네요!",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

//middleware
const editPostFB = (post_id = null,post = {})=>{
return function(dispatch, getState, {history}){
  if(!post_id){
    console.log("게시물 정보가 없습니다.")
    return; //에러방지
  }
const _image = getState().image.preview;
const _post_idx = getState().post.list.findIndex(p=> p.id === post_id);
const _post = getState().post.list[_post_idx];

const postDB = firestore.collection("post");

if(_image === _post.image_url){
  postDB.doc(post_id).update(post).then(doc=>{
    dispatch(editPost(post_id,{...post}));
    history.replace("/");
  })  
}else{
  const user_id = getState().user.user.uid;
  const _upload = storage
  .ref(`images/${user_id}_${new Date().getTime()}`)
  .putString(_image, "data_url");
_upload.then((snapshot) => {
  snapshot.ref
    .getDownloadURL()
    .then((url) => {
      return url;
    })
    .then((url) => {
      postDB.doc(post_id).update({...post, image_url:url}).then(doc=>{
        dispatch(editPost(post_id,{...post, image_url:url}));
        history.replace("/");
    })
    .catch((err) => {
      window.alert("앗! 이미지 업로드에 실패했어요!");
      console.log("앗! 이미지 업로드에 문제가 있어요!", err);
    });
});
})
}
}};

const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    
    const _user = getState().user.user;

    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };
    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
      //한번 더 기재하는 이유는 addPostFB가 실행되는 시점의 시간이 필요하기 때문
    };
    
    const _image = getState().image.preview;
    //파일명 중복방지를 위해 user_id와 현재 시간을 초로 환산한 수를 파일명으로 정한다.
    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");
    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          return url;
        })
        .then((url) => {
          postDB
            .add({ ...user_info, ..._post, image_url: url })
            .then((doc) => {
              let post = { user_info, ..._post, id: doc.id, image_url: url };
              dispatch(addPost(post));
              history.replace("/");
              //미리보기 값이 저장되어있는 리덕스의 preview값을 초기화해줘야한다.
              dispatch(imageActions.setPreview(null));
            })
            .catch((err) => {
              window.alert("앗! 포스트 작성에 실패했어요!");
              console.log("앗! 포스트 작성에 실패했어요!", err);
            });
        })
        .catch((err) => {
          window.alert("앗! 이미지 업로드에 실패했어요!");
          console.log("앗! 이미지 업로드에 문제가 있어요!", err);
        });
    });
    //firebase에 data저장

    // ~~.add({추가할 정보})
  };
};
const getPostFB = (start=null, size =3) => {
  return function (dispatch, getState, { history }) {

    let _paging = getState().post.paging;
    if(_paging.start&&!_paging.next){
      return;
    }
    dispatch(loading(true))
    const postDB = firestore.collection("post");

    let query = postDB.orderBy("insert_dt", "desc");

if(start){
  query = query.startAt(start);
}

    query.limit(size+1)
    .get().then((docs)=>{
      let post_list = [];
      let paging = {
        start:docs.docs[0],
        next:docs.docs.length === size+1? docs.docs[docs.docs.length-1]:null,
        size:size,
      }
      docs.forEach((doc) => {
        let _post = doc.data();
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );
        post_list.push(post);
        
      });
      post_list.pop();

      dispatch(setPost(post_list, paging));

    })
  };
};
const getOnePostFB = (id)=>{
  return function(dispatch, getState, {history}){
    const postDB = firestore.collection("post");
    postDB.doc(id).get().then(doc=>{
      let _post = doc.data();
    let post = Object.keys(_post).reduce(
        (acc, cur) => {
          if (cur.indexOf("user_") !== -1) {
            return {
              ...acc,
              user_info: { ...acc.user_info, [cur]: _post[cur] },
            };
          }
          return { ...acc, [cur]: _post[cur] };
        },
        { id: doc.id, user_info: {} }
      );//setPost는 배열과 페이징을 인자로 받으므로 대괄호로 묶어준다.
      dispatch(setPost([post] ));
    })
    
}};
  

//reducer
export default handleActions(
  {
    [SET_POST]: (
      state,
      action //처리할 동작 명시
    ) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);

        draft.list = draft.list.reduce((acc,cur)=>{
          if(acc.findIndex(a=>a.id === cur.id) === -1){
            return [...acc, cur];
          }else{
            acc[acc.findIndex(a=>a.id === cur.id)] = cur;
            return acc;
          }
        }, []);
        if(action.payload.paging){
          draft.paging = action.payload.paging;
        }
       
        draft.is_loading=false;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
      [EDIT_POST]: (state, action)=>produce(state, (draft) =>{
        let idx = draft.list.findIndex((p)=>p.id === action.payload.post_id);
        draft.list[idx] = {...draft.list[idx],...action.payload.post};

      }),
      [LOADING]: (state, action) => produce(state,(draft)=>{
        draft.is_loading = action.payload.is_loading;
      })
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
  editPost,
  editPostFB,
  getOnePostFB,
};

export { actionCreators };
