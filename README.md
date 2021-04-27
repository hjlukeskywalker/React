# React 연습장 🎠 
(캘린더, SNS, 버킷리스트, 각종 기능 연습 등)

## 목차
### 1. [React Calendar Project : JS 내장함수로 직접 만든 Calendar](#React-Calendar-Project)
### 2. [Image Community : 나만의 인⭐그램](#React-이미지-기반-SNS)

# React Calendar Project
캘린더 라이브러리없이 구현해 본 React 프로젝트입니다.
<center><img src="https://user-images.githubusercontent.com/68773118/112478036-e6c27500-8db6-11eb-9b27-2fffbd578e07.png" width="75%"></center>

### 사용한 패키지 및 CSS

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

### 구현 기능 및 동작 원리

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

### 폴더 구조

<center><img src="https://user-images.githubusercontent.com/68773118/112478537-76682380-8db7-11eb-923e-2d454e7aff56.png" height="400px"></center>

### 앞으로 개선할 점

- Drag & Drop으로 일자 바꾸기

    라이브러리를 이용하여 드래그가 가능하게 하였습니다. 드래그 가능한 범위를 제한하고 놓여진 위치에 따라 일정의 시간 정보를 변경하는 기능을 구현하려 합니다.

- 일정 수정 팝업

    우클릭 이벤트를 활용하여 일정 수정 기능을 구현하려 합니다.

- 일정별 색 지정 및 hover 기능 추가

    styled-component를 이용하여 일정 요소를 제작할 때 부모 요소의 제한으로 모양 지정이 용이하지 않아 부득이 inline css를 적용하였습니다. 그 결과 JSX문법으로 사용하기 적합하지 않고 hover를 적용할 수 없다는 문제점이 있었습니다. inline css외에 대체할 수 있는 방안을 찾고 일정별로 색을 달리 지정할 수 있는 기능도 추가하고 싶습니다.

---




# React 이미지 기반 SNS
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




