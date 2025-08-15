"use client";

import "./styles.css";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";
import Button from "@/components/Button";
import { redirect } from "next/navigation";

export default function Add() {

  const [platforms, setPlatforms] = useState([]);
  const [categories, setCategories] = useState([]);

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
  const [preview, setPreview] = useState('/images/photo-lg-0.svg');

  useEffect(() => {
    return () => {
      if (preview !== '/images/photo-lg-0.svg') {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('platformId', platform);
    formData.append('categoriesId', category);
    formData.append('year', year);
    formData.append('version', version);
    const response = await fetch('/api/games', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: formData
    });
    const json = await response.json();
    console.log(json);
    redirect("/dashboard");
  }

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (preview !== '/images/photo-lg-0.svg') {
        URL.revokeObjectURL(preview);
      }
      setPreview(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  }

  return (
    <ProtectedRoute>
      <div className="main">
        <div className="container">
          <Header title="Adicionar VideoJuego" back={true} />
          <img
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              display: "block",
              margin: "0 auto",
              marginTop: "-50px",
              borderRadius: "50%"
            }}
            src={preview}
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
              <input onChange={handleFileChange} type="file" id="fileInput" accept="image/png, image/jpeg, image/jpg, image/svg+xml" />
              <label htmlFor="fileInput" className="file-label">Subir Portada</label>
            </div>

            <input value={year} onChange={(e) => setYear(e.target.value)} type="number" placeholder="Año" />

            <input value={version} onChange={(e) => setVersion(e.target.value)} type="string" placeholder="Version" />

            <Button title={"Guardar"} />

          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}