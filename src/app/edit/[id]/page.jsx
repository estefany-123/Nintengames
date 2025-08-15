"use client";

import "./styles.css";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";
import Button from "@/components/Button";
import { redirect, useParams } from "next/navigation";

export default function Edit() {
  const params = useParams();
  const id = params.id;

  const [platforms, setPlatforms] = useState([]);
  const [categories, setCategories] = useState([]);

  const [game, setGame] = useState(null);

  useEffect(() => {
    async function getPlatforms() {
      const response = await fetch('/api/platforms', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      const json = await response.json();
      setPlatforms(json);
    }
    async function getCategories() {
      const response = await fetch('/api/categories', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      const json = await response.json();
      setCategories(json);
    }
    getPlatforms();
    getCategories();
  }, [])


  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('');
  const [category, setCategory] = useState('');
  const [year, setYear] = useState('');
  const [version, setVersion] = useState('');

  useEffect(() => {
    async function getGame() {
      const response = await fetch(`/api/games/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const json = await response.json();
      setTitle(json.title);
      setPlatform(json.platform.id);
      setCategory(json.category.id);
      setYear(json.year);
      setVersion(json.version);
      setGame(json);
      console.log(json);
    }
    getGame();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('platformId', platform);
    formData.append('categoriesId', category);
    formData.append('year', year);
    formData.append('version', version);
    const response = await fetch(`/api/games/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: formData
    });
    const json = await response.json();
    console.log(json);
    redirect("/dashboard");
  }

  return (
    <ProtectedRoute>
      <div className="main">
        <div className="container"> 


          <Header title="Modificar VideoJuego" back={true} />
          {game &&
            <>
              <img
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  display: "block",
                  margin: "0 auto",
                  borderRadius: "50%"
                }}
                src={"/uploads/" + game.cover}
                alt={"image"}
              />
              <form onSubmit={handleSubmit}>

                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Título" required />

                <select onChange={(e) => setPlatform(e.target.value)} required defaultValue={platform}>
                  <option value="" disabled>Seleccione Consola...</option>
                  {platforms.map((platform) => (
                    <option key={platform.id} value={platform.id}>{platform.name}</option>
                  ))}
                </select>

                <select onChange={(e) => setCategory(e.target.value)} required defaultValue={category}>
                  <option value="" disabled>Seleccione Categoría...</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>

                <div>
                  <input onChange={(e) => setFile(e.target.files[0])} type="file" id="fileInput" accept="image/png, image/jpeg, image/jpg, image/svg+xml" />
                  <label htmlFor="fileInput" className="file-label">Subir Portada</label>
                </div>

                <input value={year} onChange={(e) => setYear(e.target.value)} type="number" placeholder="Año" />

                <input value={version} onChange={(e) => setVersion(e.target.value)} type="string" placeholder="Version" />

                <Button title={"Guardar"} />

              </form>
            </>
          }
        </div>
      </div>
    </ProtectedRoute>
  );
}
