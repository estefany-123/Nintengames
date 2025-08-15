"use client";

import "./styles.css";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import Info from "./components/Info";

export default function Game() {
  const params = useParams();
  const id = params.id;

  const [game, setGame] = useState(null);
  useEffect(() => {
    async function getGame() {
      const response = await fetch(`/api/games/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const json = await response.json();
      setGame(json);
      console.log(json);
    }
    getGame();
  }, []);

  return (
    <ProtectedRoute>
      <div className="main">
        <Header title="Consultar VideoJuego" back={true} />
        <img
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            display: "block",
            margin: "0 auto",
            borderRadius: "50%"
            
          }}
          src={game ? `/uploads/${game.cover}` : "/images/photo-lg-0.svg"}
          alt="Cover"
        />
        {game &&
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
                marginTop: "50px",
            }}>
                <Info image="info-title.svg" title={game.title} />
                <Info image="info-platform.svg" title={game.platform.name} />
                <Info image="info-category.svg" title={game.category.name} />
                <Info image="info-year.svg" title={game.year} />
                <Info image="info-version.svg" title={game.version} />
            </div>
        }
      </div>
    </ProtectedRoute>
  );
}
