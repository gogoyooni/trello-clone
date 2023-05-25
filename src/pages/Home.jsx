import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>여기서 로그인하게끔 하기</p>
      <Link to="/b">워크스페이스로</Link>
    </div>
  );
}
