import React from "react";

const Notice = () => {
  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        top: "64px",
        left: 0,
        right: 0,
        height: "32px",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "crimson",
        color: "white",
        fontWeight: "bold",
        zIndex: 1000,
      }}
    >
      점검 공지: 7월 20일 오전 0:00 ~ 종료시까지 (웹 호스팅 서버 변경 테스트)
    </div>
  );
};

export default Notice;
