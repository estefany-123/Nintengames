'use client'

import React, { useState } from "react";
import './styles.css';
import { redirect } from "next/navigation";

export default function login (){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const json = await response.json();

        if(response.ok) {
            localStorage.setItem("token", json.token);
            return redirect("/dashboard");
        }
        setError(json.error);
    }

    return (
        <div className="main">
            <form onSubmit={(e)=>handleSubmit(e)}>
                {error && <p className="error">{error}</p>}
                <input onChange={(e) => setEmail(e.target.value)} placeholder="Correo Electrónico" type="email" />
                <input onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" type="password" name="" id="" />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    )
}