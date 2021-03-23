import React from "react";
import styled, { keyframes, css } from "styled-components";

const Detail = (props) => {
  return (
      <div>
          <div>일정 내용 
              Ref저장, 안쓰면 팝업경고</div>
          <div>일시 텍스트</div>
          <button>삭제</button>
          <button>완료</button>
      </div>
  );
}

export default Detail;
