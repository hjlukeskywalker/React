import { createAction, handleAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { getCookie, setCookie, deleteCookie } from "../../shared/Cookie";
import { auth } from "../../shared/firebase";
import firebase from "firebase/app";

const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

//action creators
const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

//initialState
const initialState = {
  user: null,
  is_login: false,
};

const user_initial = {
  user_name: "gomi",
};

//middlewatr actions
const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then((res)=>{
        auth.signInWithEmailAndPassword(id, pwd)
        .then((user) => {
          console.log(user);
          dispatch(setUser({ 
              user_name: user.user.displayName,
              id: id, user_profile: "",
            uid:user.user.uid, }));
          history.push("/");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode,errorMessage);
        });
    });
  };
};

const signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {
        console.log(user);

        auth.currentUser
          .updateProfile({
            displayName: user_name,
          })
          .then(() => {
            dispatch(
              setUser({ user_name: user_name, id: id, user_profile: "",uid:user.user.uid, })
            );
            history.push("/");
          })
          .catch((error) => {
            console.log("error");
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
        // ..
      });
  };
};

const loginCheckFB = () =>{
    return function(dispatch, getState, {history}){
        auth.onAuthStateChanged((user)=> {
            if(user){
                dispatch(setUser({
                    user_name:user.displayName,
                    user_profile:"",
                    id:user.email,
                    uid:user.uid,
                })
                 
                )
            }else{
                dispatch(logOut());
            }
        })
    }
}

const logoutFB = () =>{
    return function (dispatch, getState, {history}) {
auth.signOut().then(()=>{
    dispatch(logOut());
    history.replace("/");
    //뒤로가기해도 원래 페이지가 나오지 않음.
})
    }
}
//reducer produce (immer) 통해서 불변성 유지
// immer가 복사한 값을 draft로 받아 저장한다는 의미.
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

//action creator export
const actionCreators = {
  logOut,
  getUser,
  loginFB,
  signupFB,
  loginCheckFB,
  logoutFB,
};

export { actionCreators };
