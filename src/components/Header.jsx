"use client";

import { redirect } from "next/navigation";

export default function Header({ title, back }) {

  function logout(){
    localStorage.removeItem("token");
    redirect("/login");
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "150px",
        color: "white",
        fontSize: "18px",
        fontWeight: "100",
        position: "relative",
      }}
    >
      {title}
      <img
        style={{
          position: "absolute",
          right: "20px",
          cursor: "pointer",
        }}
        src="/images/btn-close.svg"
        alt="close"
        onClick={logout}
      />
      {back &&
        <img
            style={{
            position: "absolute",
            left: "25px",
            cursor: "pointer",
            }}
            src="/images/btn-back.svg"
            alt="back"
            onClick={() => redirect("/dashboard")}
        />
      }
    </div>
  );
}
