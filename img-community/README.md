

# React 이미지 기반 SNS

<image src="https://media.vlpt.us/images/mygomi/post/6c3df6ab-5741-455e-9243-12f8ebff38cf/ezgif.com-gif-maker%20(6).gif"/>

#### (2021.03.28 ~ 2021.04.01)
두번째✌ 리액트 프로젝트를 마쳤습니다. 리액트를 빠르게 습득한 뒤 팀 프로젝트를 진행하고자 했기에 디자인적 디테일보다는 기능 구현에 힘썼습니다. 
#### 구현기능
이미지 기반 SNS의 주요 기능인 
이미지 업로드하여 게시물작성/수정, 
댓글, 좋아요, 유저별 실시간 알림,
로그인, 게시물 무한 스크롤을 구현했습니다.

> #### 이전 프로젝트와 달라진 점
재사용 컴포넌트를 적극 활용했습니다.
컴포넌트를 세분화하다보니 폴더를 나눠 코드를 관리했습니다.
다양한 툴을 이용해보려했습니다.

---

### 📝 폴더구조 : 컴포넌트 세분화
![](https://images.velog.io/images/mygomi/post/10fa52c5-4dbe-42ee-8339-ade31dbe6ec7/React.jpg)

React의 큰 장점이라 하는 컴포넌트 재사용을 경험해보기 위해 src 폴더 내에 4개의 폴더를 추가해 컴포넌트를 관리했습니다. 

컴포넌트를 나누는 작업을 하다보니 프로젝트 초반부에 작성해야할 코드의 양이 많았습니다. 그러나** 프로젝트가 진행될수록 컴포넌트 재사용의 편리함**을 느낄 수 있었습니다. 유지 보수, 확장 시에 확실히 더 유용하겠구나 싶었습니다.

- /elements :  Button, Grid, Text, Input 등의 최소단위 컴포넌트를 모아두었고
- /components : elements 컴포넌트를 조합해서 만든 컴포넌트 단위
- /pages : 컴포넌트 조합으로 이루어진 페이지
- /shared : 공용으로 사용할 코드인 App.js, firebase.js 등

---
### 📝 Tools & Packages

CRA (Create-React-App)를 이용한 React 개발환경 구축

**디자인관련**
styled component
material UI
Figma (UI/UX design tool) - 와이어프레임 

**Chrome extension**
React developer Tools : 리액트 디버깅에 도움이 된다고 하는데 다른 이들의 활용사례를 접하며 익숙해져야 할 것 같습니다.
Redux devTools : logger 사용이 안되어서 이 프로그램을 유용하게 사용했습니다.

**데이터관리**
Redux와 Firebase를 사용했습니다.
: User, Post, Comment, 사용자가 업로드하는 이미지 파일 등 관리 대상이 증가함에 따라 리덕스 모듈을 4개로 만들어 사용하였고 combineReducers를 이용해 하나의 리듀서로 만들었습니다.
```
yarn add 
redux react-redux redux-thunk //리덕스와 미들웨어
history@4.10.1 connected-react-router@6.8.0 //라우터와 히스토리 연결
immer //불변성 관리 
redux-actions //액션 생성함수 작성 편리
redux-logger //액션에 따른 데이터 변화 확인 편리
```

---

#### 구현기능
이미지 기반 SNS의 주요 기능인
이미지 업로드하여 게시물작성/수정,
댓글, 좋아요, 유저별 실시간 알림,
로그인, 게시물 무한 스크롤을 구현했습니다.

![](https://images.velog.io/images/mygomi/post/4794a43f-0e47-4d7f-a692-452c5a741b0d/ezgif.com-gif-maker%20(5).gif)


---

### 📝 기능별 코드리뷰
추가예정

---


### 📝 도전하고 싶은점
#### Redux가 아닌 다른 상태관리 라이브러리를 사용해 볼 수 있기를
react를 배우며 자연스레 redux를 함께 배웠지만 다른 상태관리 라이브러리도 존재함을 알게 되었다. 다른 것을 사용해보아야 redux가 어떤 장점을 가졌기에 많이 사용되고 있는 지, 어떤 목적과 특징을 가진 방식인지를 더 이해할 수 있다고 생각한다. 
아래는 velopert님의 글이다. '_모르고 안 쓰는 거랑, 알고 안 쓰는거랑은 다르기 때문_'이라는 말이 와 닿는다. 
[상태관리 라이브러리의 미학](https://velopert.com/3707)

### 📝 배운 점
- Debounce와 Throttle을 이용해 과도한 이벤트 발생을 제어할 수 있다. 이벤트 실행 전에 일정 시간 텀을 두는 원리이다. 이 둘의 차이점은 별도 게시물로 정리해 올릴 것이다. 발생하는 이벤트를 전부 반영하지 않고 일정시간 텀을 둠으로써 과도한 리렌더링도 방지할 수 있고 무한 스크롤 구현에도 활용할 수 있다. 
- 컴포넌트별 defaultProps를 설정해둠으로써 주어진 props가 없어 발생하는 오류를 방지할 수 있다. 
- FileReader의 필요성, 사용자가 input태그를 통해 업로드한 파일은 File이라는 객체로 받아오게 되는데 여기서 끝이 아니라 파일의 내용을 읽기 위해서는 FileReader라는 객체를 사용해야 한다. [FileReader-MDN문서](https://developer.mozilla.org/ko/docs/Web/API/FileReader)
- state 변화는 리렌더링으로 이어져 성능에 직접적인 영향을 미친다. select 태그에 값이 잘 들어오고 있는 지 확인해 보려다가 과도한 리렌더링(Debounce와 Throttle도 사용하지 않음)으로 React에서 에러를 보이는 현상도 경험했다. 다른 컴포넌트에 즉각 반영이 필요하고 리렌더링 해야하는 데이터인지 신중하게 고민하여 판단해야 한다는 것을 배웠다. 사용성을 위해 가능한 리렌더링을 줄이는 것이 좋겠다. 
- 프로젝트 시작 전에 자바스크립트 호이스팅과 변수 선언 방식에 따라 TDZ가 발생하는 이유, 객체의 프로퍼티, 콜백, 프로토 타입을 다시 복습했는데 프로젝트 전, 후로 다시보니 추상적으로 느껴지던 개념이 조금은 더 또렷해졌다. 의식하며 코드를 작성해야지! 
