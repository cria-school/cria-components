import * as React from "react";

import style from './style.module.css'

function IconLoading(props) {
  return (
    <svg
      style={{
        margin: "auto",
        background: "0 0",
        display: "block"
      }}
      width={100}
      height={100}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <circle className={`${style.purple} ${style.purple1}`} cx={50} cy={50} fill="#5321bf" r={10}>
      </circle>
      <circle className={style.pink} cx={50} cy={50} fill="#f20774" r={10}>
      </circle>
      <circle className={`${style.purple} ${style.purple2}`} cx={50} cy={50} fill="#5321bf" r={10}>
      </circle>
    </svg>
  );
}

export default IconLoading

