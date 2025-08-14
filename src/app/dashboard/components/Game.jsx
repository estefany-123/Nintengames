"use client";

import React from "react";
import { redirect } from "next/navigation";

export default function Game({ index, id, title, platform, cover, deleteAction }) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "110px",
        backgroundColor:
          index % 2 === 0 ? "rgba(255,255,255,.6)" : "rgba(255,255,255,.8)",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        style={{
          width: "75px",
          height: "75px",
          objectFit: "cover",
          marginLeft: "10px",
          borderRadius: "50%"
        }}
        src={"/uploads/" + cover}
        alt={title}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          marginLeft: "5px",
        }}
      >
        <span
          style={{
            color: "#8A4B4F",
          }}
        >
          {platform}
        </span>
        <span
          style={{
            color: "#8A4B4F",
            fontSize: "12px",
          }}
        >
          {title}
        </span>
      </div>
      <div style={{ marginLeft: "auto", marginRight: "10px", display: "flex", gap: "4px" }}>
        <img onClick={() => redirect("/game/" + id)} src="/images/btn-show.svg" alt="show" />
        <img onClick={() => redirect("/edit/" + id)} src="/images/btn-edit.svg" alt="edit" />
        <img onClick={() => deleteAction(id)} src="/images/btn-delete.svg" alt="delete" />
      </div>
    </div>
  );
}
