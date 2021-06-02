# React 연습장 🎠 주요 프로젝트 요약
(캘린더, SNS, 버킷리스트, 각종 기능 연습 등)

## 목차
### 1. [Image Community : 나만의 인⭐그램](#React-이미지-기반-SNS)
### 2. [React Calendar Project : JS 내장함수로 직접 만든 Calendar](#React-Calendar-Project)

<br/>


# React 이미지 기반 SNS


![image](https://user-images.githubusercontent.com/68773118/116310831-752a7c00-a7e5-11eb-8256-ab1667e33468.png)

## 목차
1. [프로젝트 소개](#프로젝트-소개)
2. [사용 기술](#Tools--Packages)
3. [폴더 구조](#폴더구조-컴포넌트-세분화)
4. [기능 구현 방식](#기능별-코드리뷰)
5. [도전하고 싶은 점](#도전하고-싶은점)
6. [배운 점](#배운-점)

## 프로젝트 소개
```
(2021.03.28 ~ 2021.04.01)
두번째✌ 리액트 프로젝트를 마쳤습니다. 
리액트를 빠르게 습득한 뒤 팀 프로젝트를 진행하고자 했기에 디자인적 디테일보다는 기능 구현에 힘썼습니다. 
```

## 구현기능
이미지 기반 SNS의 주요 기능들을 구현해보았다.
- 게시물 무한 스크롤
- 게시물작성/수정
- 이미지 업로드 기능
- 댓글
- 좋아요
- 유저별 실시간 알림
- 로그인/회원가입

> #### 이전 프로젝트와 달라진 점
재사용 컴포넌트를 적극 활용했습니다.
컴포넌트를 세분화하다보니 폴더를 나눠 코드를 관리했습니다.
다양한 툴을 이용해보려했습니다.

## Tools & Packages

View (React with JavaScript, React-Router, material-UI, Styled-components)
Build Tool (Create React App)
Infrastructure (AWS S3, Route 53)

**Design**
styled component
material UI
Figma (UI/UX design tool) - 와이어프레임 

**Chrome extension**
React developer Tools : 리액트 디버깅에 도움이 된다고 하는데 다른 이들의 활용사례를 접하며 익숙해져야 할 것 같습니다.
Redux devTools : logger 사용이 안되어서 이 프로그램을 유용하게 사용했습니다.

**State Management**
Redux와 Firebase를 사용했습니다.
: User, Post, Comment, 사용자가 업로드하는 이미지 파일 등 관리 대상이 증가함에 따라 리덕스 모듈을 4개로 만들어 사용하였고 combineReducers를 이용해 하나의 리듀서로 만들었습니다.
Firebase
: realtime database (실시간 알림), cloud storage (이미지 업로드), authentication (로그인 인증)

```
yarn add 
redux react-redux redux-thunk //리덕스와 미들웨어
history@4.10.1 connected-react-router@6.8.0 //라우터와 히스토리 연결
immer //불변성 관리 
redux-actions //액션 생성함수 작성 편리
redux-logger //액션에 따른 데이터 변화 확인 편리
```

## 폴더구조-컴포넌트 세분화
![](https://images.velog.io/images/mygomi/post/10fa52c5-4dbe-42ee-8339-ade31dbe6ec7/React.jpg)

React의 큰 장점이라 하는 컴포넌트 재사용을 경험해보기 위해 src 폴더 내에 4개의 폴더를 추가해 컴포넌트를 관리했습니다. 

컴포넌트를 나누는 작업을 하다보니 프로젝트 초반부에 작성해야할 코드의 양이 많았습니다. 그러나** 프로젝트가 진행될수록 컴포넌트 재사용의 편리함**을 느낄 수 있었습니다. 유지 보수, 확장 시에 확실히 더 유용하겠구나 싶었습니다.

- /elements :  Button, Grid, Text, Input 등의 최소단위 컴포넌트를 모아두었고
- /components : elements 컴포넌트를 조합해서 만든 컴포넌트 단위
- /pages : 컴포넌트 조합으로 이루어진 페이지
- /shared : 공용으로 사용할 코드인 App.js, firebase.js 등

---

## 기능별 코드리뷰

![](https://images.velog.io/images/mygomi/post/4794a43f-0e47-4d7f-a692-452c5a741b0d/ezgif.com-gif-maker%20(5).gif)

## 📝 기능별 리뷰
## 1. 무한 스크롤
(목적) 
첫 로딩 시 모든 데이터를 받아오지 않고 무한스크롤을 이용하여 사용자의 체감 로딩 속도를 줄임
(사용기술)
throttle로 이벤트를 관리하기 위해 lodash 라이브러리를 이용
firestore 쿼리로 작성일 기준 정렬

![](https://images.velog.io/images/mygomi/post/9d748f79-842f-41ae-ae91-aebae845a0a9/image.png)

1. Paging 처리
	- 시작점 이후 포스트가 없다면 return;
	- 이후 포스트가 있다면 시작점으로 부터 size+1만큼의 포스트를 가져온다. (size+1을 가져오는 이유는 다음 페이지가 존재하는 지를 확인하기 위함이다.)
	- Paging 객체 프로퍼티(start, next) 수정
	- 가져온 데이터 중 size만큼의 포스트를 렌더링
2. InfinityScroll
	- throttle로 다음 페이징 정보를 불러오는 콜백함수와 관리할 이벤트 시간을 설정함.
	- useEffect를 이용하여 loading 중이 아니고 다음 포스트가 존재한다면 scroll event 발생 시 
	- throttle이 작동하도록 구독하고 다음 페이지가 없거나 컴포넌트가 사라지면 해당 이벤트를 클린업한다. 
3. 스크롤 영역을 계산
	- 매 스크롤마다 3개 포스팅 로딩이 발생해선 안된다.
	- throttle에 스크롤 영역 조건을 추가한다.
4. Spinner 적용
	- 로딩 중임을 알려 사용자 이탈을 방지
5. 상세 페이지 처리
	- 무한 스크롤 되지 않은 포스트를 링크를 통해 직접 상세 페이지로 이동하고자 한다면? 데이터 불러오기 전으로 오류 발생
	- 무한 스크롤을 통해 리덕스에 저장된 데이터가 없는 상태라면 firebase에서 단일 데이터를 불러오는 코드 추가

## 2. 게시물 작성/수정
1. 로그인 여부 판단
2. `post_id` 존재 여부로 작성/수정 확인하여 페이지 제목과 버튼 내용 분기처리
3. 수정인 경우 기존 포스트의 이미지와 콘텐츠 불러와 보여주기
4. 게시글 레이아웃 선택 가능하도록 함
- select box value에 따라 JSX 레이아웃을 다르게 렌더링함

## 3. 이미지 업로드 기능
![](https://images.velog.io/images/mygomi/post/30b2e522-5f31-45c2-8249-eb29aeff17ae/image.png)

(사용기술)
파일 업로드가 가능한 firebase Storage 이용
[input type="file"](https://developer.mozilla.org/ko/docs/Web/HTML/Element/Input/file)
[FileReader](https://developer.mozilla.org/ko/docs/Web/API/FileReader)

1. onChange에서 파일 객체를 가져와서 state에 저장해뒀다가 
2. 저장 버튼을 누르면 firebase의 Storage에 저장
3. Preview  기능
	- 파일 선택 > 이미지 URL 추출 > 미리보기 이미지 표시

## 4. 댓글
- 댓글 작성 시 포스트 목록에 보이는 포스트 댓글 개수도 수정이 필요함.

![](https://images.velog.io/images/mygomi/post/f95bbe99-9ce7-444f-be63-70e971661d46/image.png)

```js
// redux/modules/comment.js 
...
  if (post) {
            dispatch(
              postActions.editPost(post_id, {
                comment_cnt: parseInt(post.comment_cnt) + 1,
              })
            );
```
- 댓글 추가 (Button & onKeyPress Enter)

## 5. 좋아요

(사용기술)
- firestore에 like DB 별도 생성
    - post DB 내에 like 항목을 추가하려 했으나 좋아요 유저가 늘어나는 경우 더 이상 좋아요가 불가능하다는 등의 에러가 발생할 수 있다고 하여 별도 DB로 분리하였음.
1. 하트 버튼에 좋아요 토글 함수 연결
- 좋아요된 상태라면 likeDB 데이터와 postDB 데이터의 like_cnt를 -1
- 리덕스 데이터 변경
- 좋아요가 되어 있지않다면 반대로 likeDB와 postDB에 like_cnt를 추가
2. 좋아요 여부에 따라 하트버튼 분기처리
- post_list와 likeDB의 post_id를 대조
- likeDB에는 post_id를 key값으로 두고 좋아요를 누른 user_id 배열이 value로 저장되어 있음.
- 좋아요를 누른 user 배열안에 id와 로그인한 user의 id가 일치한다면 is_like을 true로 바꾸어 하트버튼 색을 변경해줌.

## 6. 알림
(사용기술)
material ui의 badge, icon
realtime DB

- 알림 발생 조건
	내가 작성한 게시물인가?
    타인이 작성한 댓글과 좋아요인가?
- 알림 확인 여부에 따라 알림 on/off
- 알림 아이콘 클릭 시 알림 내역 표시
각 카드에는 포스트로 이동하는 경로 연결
```js
_onClick={() =>
{history.push(`/post/${post_id}`);}}
```
![](https://images.velog.io/images/mygomi/post/6e277f75-2a40-4db2-bf2b-342128322693/image.png)

## 7. 로그인/회원가입
- 모듈화한 정규표현식으로 이메일 정합성 체크
```js
//shared/common.js
export const emailCheck = (email) => {
    let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;

    return _reg.test(email);
}
```
- Firebase Authentication 이용하여 파이어베이스에 회원가입 연동
  1. firebase.js에 만들어둔 auth 가져오기 (import)
  2. 리덕스에서 signupFB 함수 만들기
  3. auth.createUserWithEmailAndPassword()로 가입 시키기
  4. Signup 컴포넌트에서 signupFB를 호
  5. 가입한 후, display_name 바로 업데이트하기
  6. 사용자 정보 업데이트 후에 메인 페이지로 이동하기
- 파이어베이스를 통해 로그인 상태를 확인하여 리덕스에서 유저 정보 유지
  1. firebase.js에 만들어둔 auth 가져오기 (import)
  2. 리덕스에서 loginFB 함수 만들기
  3. auth.signInWithEmailAndPassword()로 로그인
  4. Login 컴포넌트에서 loginFB를 호출
  5. 리덕스의 user 정보 업데이트 후에 메인 페이지로 이동하기


---


## 도전하고 싶은점
#### Redux가 아닌 다른 상태관리 라이브러리를 사용해 볼 수 있기를
react를 배우며 자연스레 redux를 함께 배웠지만 다른 상태관리 라이브러리도 존재함을 알게 되었다. 다른 것을 사용해보아야 redux가 어떤 장점을 가졌기에 많이 사용되고 있는 지, 어떤 목적과 특징을 가진 방식인지를 더 이해할 수 있다고 생각한다. 
아래는 velopert님의 글이다. '_모르고 안 쓰는 거랑, 알고 안 쓰는거랑은 다르기 때문_'이라는 말이 와 닿는다. 
[상태관리 라이브러리의 미학](https://velopert.com/3707)

## 배운 점
- Debounce와 Throttle을 이용해 과도한 이벤트 발생을 제어할 수 있다. 이벤트 실행 전에 일정 시간 텀을 두는 원리이다. 이 둘의 차이점은 별도 게시물로 정리해 올릴 것이다. 발생하는 이벤트를 전부 반영하지 않고 일정시간 텀을 둠으로써 과도한 리렌더링도 방지할 수 있고 무한 스크롤 구현에도 활용할 수 있다. 
- 컴포넌트별 defaultProps를 설정해둠으로써 주어진 props가 없어 발생하는 오류를 방지할 수 있다. 
- FileReader의 필요성, 사용자가 input태그를 통해 업로드한 파일은 File이라는 객체로 받아오게 되는데 여기서 끝이 아니라 파일의 내용을 읽기 위해서는 FileReader라는 객체를 사용해야 한다. [FileReader-MDN문서](https://developer.mozilla.org/ko/docs/Web/API/FileReader)
- state 변화는 리렌더링으로 이어져 성능에 직접적인 영향을 미친다. select 태그에 값이 잘 들어오고 있는 지 확인해 보려다가 과도한 리렌더링(Debounce와 Throttle도 사용하지 않음)으로 React에서 에러를 보이는 현상도 경험했다. 다른 컴포넌트에 즉각 반영이 필요하고 리렌더링 해야하는 데이터인지 신중하게 고민하여 판단해야 한다는 것을 배웠다. 사용성을 위해 가능한 리렌더링을 줄이는 것이 좋겠다. 
- 프로젝트 시작 전에 자바스크립트 호이스팅과 변수 선언 방식에 따라 TDZ가 발생하는 이유, 객체의 프로퍼티, 콜백, 프로토 타입을 다시 복습했는데 프로젝트 전, 후로 다시보니 추상적으로 느껴지던 개념이 조금은 더 또렷해졌다. 의식하며 코드를 작성해야지! 


---


# React Calendar Project
### 캘린더 라이브러리없이 구현해 본 React 프로젝트입니다.

<center><img src="https://user-images.githubusercontent.com/68773118/112478036-e6c27500-8db6-11eb-9b27-2fffbd578e07.png" width="75%"></center>

## 목차
1. [사용 기술](#사용한-패키지-및-CSS)
2. [구현 기능 및 동작 원리](#구현-기능-및-동작-원리)
3. [폴더 구조](#폴더-구조)
4. [앞으로 개선할 점](#앞으로-개선할-점)

## 사용한 패키지 및 CSS

- CRA (Create-React-App)

    React 개발환경 구축

- styled component

    컴포넌트별 스타일 관리 

    부모요소로부터 독립되어야 하는 일부 요소에  inline css 를 혼용하였습니다.

- Redux

    등록된 일정들을 전역 상태관리하기 위하여 사용했습니다. Action, ActionCreator , Reducer를 한 파일에 명시하는 Ducks pattern으로 작업하였습니다. 
    (구조 설명 [https://github.com/erikras/ducks-modular-redux](https://github.com/erikras/ducks-modular-redux))

<center><img src="https://user-images.githubusercontent.com/68773118/112490586-d7492900-8dc2-11eb-9491-5200f87c943f.png" height="400px"></center>
  

- BaaS

    Firebase의 firestore db를 이용하였으며 Hosting 배포를 진행하였습니다.

## 구현 기능 및 동작 원리

![ezgif com-gif-maker (4) (1)](https://user-images.githubusercontent.com/68773118/116311692-80ca7280-a7e6-11eb-8ef7-b59c128a4dad.gif)


- 월 이동 기능

    JavaScript의 date함수를 이용하여 해당 월의 1일이 시작하는 요일(달력 표기가 시작되는 지점)과 마지막 날짜(달력 표기가 끝나는 지점)를 구하고 이를 배열로 저장하여 렌더링하였습니다.

- 일정 클릭 시 모달창에 상세 내용 표기

    부모 컴포넌트에서 모달 창 열림 여부, 모달 닫기 함수, 클릭한 요소에 대한 값을 state로 두고 모달 컴포넌트로 전달하였습니다. 모달 컴포넌트에서는 클릭한 요소와 일치하는 일정에 대한 정보를 렌더링하게 하였습니다. 모달창은 Confirm 버튼을 누르거나 모달창 바깥의 오버레이된 부분을 클릭해도 닫히도록 만들었습니다.

- 일정 삭제 및 완료 여부

    모달창을 통해 일정 삭제가 가능하며 완료 여부를 선택할 수 있습니다. 완료된 일정은 모달창 상단에 완료된 일정이라 표기됩니다. 완료되지 않은 일정은 예정된 일정이라 표기됩니다.

- 캘린더 내에 시간순으로 정렬된 일정 표기

    filter함수를 이용하여 캘린더 날짜와 일정의 시간 정보를 대조하여 골라냅니다. 이후 입력된 일정에 대한 시간 정보를 JS 내장함수인 sort()함수로 정렬하여 렌더링합니다. 날짜 필터링 전에 정렬을 할 경우 일정 데이터가 늘어날수록 성능이 저하될 듯 하여 날짜별로 골라낸 후에 정렬을 수행하도록 하였습니다.

- 일정 추가 기능 버튼

    첫 화면에 있는 두 개의 버튼은 모두 플로팅 버튼으로 구현하였습니다. 일정의 내용과 시간 정보가 모두 입력되었는지를 확인한 뒤 입력되지 않은 정보가 있다면 팝업창이 뜹니다. 입력된 정보는 최종적으로 firestore에 저장됩니다.

- 완료된 일정/전체 일정을 볼 수 있는 버튼

    Finished 버튼을 클릭하면 데이터에 저장된 완료여부를 판별하여 완료된 일정만 표기되도록 하였습니다. 이 때 버튼의 내용은 전체 일정을 확인할 수 있다는 의미로 All 변환되도록 했습니다.

## 폴더 구조

<center><img src="https://user-images.githubusercontent.com/68773118/112478537-76682380-8db7-11eb-923e-2d454e7aff56.png" height="400px"></center>

## 앞으로 개선할 점

- Drag & Drop으로 일자 바꾸기

    라이브러리를 이용하여 드래그가 가능하게 하였습니다. 드래그 가능한 범위를 제한하고 놓여진 위치에 따라 일정의 시간 정보를 변경하는 기능을 구현하려 합니다.

- 일정 수정 팝업

    우클릭 이벤트를 활용하여 일정 수정 기능을 구현하려 합니다.

- 일정별 색 지정 및 hover 기능 추가

    styled-component를 이용하여 일정 요소를 제작할 때 부모 요소의 제한으로 모양 지정이 용이하지 않아 부득이 inline css를 적용하였습니다. 그 결과 JSX문법으로 사용하기 적합하지 않고 hover를 적용할 수 없다는 문제점이 있었습니다. inline css외에 대체할 수 있는 방안을 찾고 일정별로 색을 달리 지정할 수 있는 기능도 추가하고 싶습니다.


---
