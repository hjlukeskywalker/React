# React Calendar Project
캘린더 라이브러리없이 구현해 본 React 프로젝트입니다.
<center><img src="https://user-images.githubusercontent.com/68773118/112478036-e6c27500-8db6-11eb-9b27-2fffbd578e07.png" width="60%"></center>

### 사용한 패키지 및 CSS

- CRA (Create-React-App)

    React 개발환경 구축

- styled component

    컴포넌트별 스타일 관리 

    부모요소로부터 독립되어야 하는 일부 요소에  inline css 를 혼용하였습니다.

- Redux

    등록된 일정들을 전역 상태관리하기 위하여 사용했습니다. Action, ActionCreator , Reducer를 한 파일에 명시하는 Ducks pattern으로 작업하였습니다. 
    (구조 설명 [https://github.com/erikras/ducks-modular-redux](https://github.com/erikras/ducks-modular-redux))

<center><img src="https://s3-us-west-2.amazonaws.com/secure.notion-static.com/69eeb44f-f56f-4369-acd2-d52aa2bb4732/Untitled.png" height="400px"></center>
  

- BaaS

    Firebase의 firestore db를 이용하였으며 Hosting 배포를 진행하였습니다.

### 구현 기능 및 동작 원리

- 월 이동 기능

    JavaScript의 date함수를 이용하여 해당 월의 1일이 시작하는 요일(달력 표기가 시작되는 지점)과 마지막 날짜(달력 표기가 끝나는 지점)를 구하고 이를 배열로 저장하여 하였습니다.

- 일정 클릭 시 모달창에 상세 내용 표기

    부모 컴포넌트에서 모달 창 열림 여부, 모달 닫기 함수, 클릭한 요소에 대한 값을 state로 두고 모달 컴포넌트로 전달하였습니다. 모달 컴포넌트에서는 클릭한 요소와 일치하는 일정에 대한 정보를 렌더링하게 하였다. 모달창은 Confirm 버튼을 누르거나 모달창 바깥의 오버레이된 부분을 클릭해도 닫히도록 만들었습니다.

- 일정 삭제 및 완료 여부

    모달창을 통해 일정 삭제가 가능하며 완료 여부를 선택할 수 있습니다. 완료된 일정은 모달창 상단에 완료된 일정이라 표기됩니다. 완료되지 않은 일정은 예정된 일정이라 표기됩니다.

- 캘린더 내에 시간순으로 정렬된 일정 표기

    filter함수를 이용하여 캘린더 날짜와 일정의 시간 정보를 대조하여 골라냅니다. 이후 입력된 일정에 대한 시간 정보를 JS 내장함수인 sort()함수로 정렬하여 렌더링합니다. 날짜 필터링 전에 정렬을 할 경우 일정 데이터가 늘어날수록 성능이 저하될 듯 하여 날짜별로 골라낸 후에 정렬을 수행하도록 하였습니다.

- 일정 추가 기능 버튼

    첫 화면에 있는 두 개의 버튼은 모두 플로팅 버튼으로 구현하였습니다. 일정의 내용과 시간 정보가 모두 입력되었는지를 확인한 뒤 입력되지 않은 정보가 있다면 팝업창이 뜹니다. 입력된 정보는 최종적으로 firestore에 저장됩니다.

- 완료된 일정/전체 일정을 볼 수 있는 버튼

    Finished 버튼을 클릭하면 데이터에 저장된 완료여부를 판별하여 완료된 일정만 표기되도록 하였습니다. 이 때 버튼의 내용은 전체 일정을 확인할 수 있다는 의미로 All 변환되도록 했습니다.

### 폴더 구조

<center><img src="[https://user-images.githubusercontent.com/68773118/112478537-76682380-8db7-11eb-923e-2d454e7aff56.png](https://user-images.githubusercontent.com/68773118/112478537-76682380-8db7-11eb-923e-2d454e7aff56.png)" height="400px"></center>

### 앞으로 개선할 점

- Drag & Drop으로 일자 바꾸기

    라이브러리를 이용하여 드래그가 가능하게 하였습니다. 드래그 가능한 범위를 제한하고 놓여진 위치에 따라 일정의 시간 정보를 변경하는 기능을 구현하려 합니다.

- 일정 수정 팝업

    우클릭 이벤트를 활용하여 일정 수정 기능을 구현하려 합니다.

- 일정별 색 지정 및 hover 기능 추가

    styled-component를 이용하여 일정 요소를 제작할 때 부모 요소의 제한으로 모양 지정이 용이하지 않아 부득이 inline css를 적용하였습니다. 그 결과 JSX문법으로 사용하기 적합하지 않고 hover를 적용할 수 없다는 문제점이 있었습니다. inline css외에 대체할 수 있는 방안을 찾고 일정별로 색을 달리 지정할 수 있는 기능도 추가하고 싶습니다.



