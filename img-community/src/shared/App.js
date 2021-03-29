
import './App.css';
import React from "react";

import {BrowserRouter, Route} from "react-router-dom";
import {ConnectedRouter} from "connected-react-router";
import {history} from "../redux/configureStore";

import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Permit from "../shared/Permit";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";

import Header from "../components/Header";
import {Button, Grid} from "../elements";

import {useDispatch} from "react-redux";
import {actionCreators as userActions} from "../redux/modules/user";

import {apiKey} from "./firebase";

function App() {

  const dispatch = useDispatch();
//App.js가 시작점이기 때문에 여기서 로그인 여부를 체크
const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;

const is_session = sessionStorage.getItem(_session_key)? true:false;
console.log(is_session,_session_key);

React.useEffect(()=>{
  if(is_session){
    dispatch(userActions.loginCheckFB());
  }
}, []);

  return (
    <React.Fragment>
      <Grid>
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup}/>
          <Route path="/write" exact component={PostWrite}/>
          <Route path="/post/:id" exact component={PostDetail}/>
        </ConnectedRouter>
      </Grid>
      <Permit>
        <Button is_float text="+" _onClick={()=>{history.push("/write")}}></Button>
      </Permit>
    </React.Fragment>
  );
}

export default App;
