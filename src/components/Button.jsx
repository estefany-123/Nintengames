"use client";

import React from "react";

export default function Button({ title, action }) {
  return (
    <button
      style={{
        width: "90%",
        height: "50px",
        border: "0",
        backgroundColor: "#58c084",
        display: "block",
        margin: "0 auto",
        color: "white",
        borderRadius: "30px",
        fontSize: "18px",
        cursor: "pointer",
      }}
      onClick={action}
    >
      {title}
    </button>
  );
}
