import React from "react";
import "./index.css";
import ImgLoading from "@/assets/loading.gif";

export default function LoadingComponent(): JSX.Element {
  return (
    <div className="loading">
      <img src={ImgLoading} />
      <div>加载中...</div>
    </div>
  );
}
