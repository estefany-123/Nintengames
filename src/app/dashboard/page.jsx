'use client'

import './styles.css';
import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Button from '@/components/Button';
import { redirect } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import Game from './components/Game';

export default function Dashboard() {

    const [games, setGames] = useState([]);
    useEffect(() => {
        async function getGames() {
            const response = await fetch('/api/games',{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            const json = await response.json();
            setGames(json);
        }
        getGames();
    },[]);

    async function deleteAction(id){
        await fetch(`/api/games/${id}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        setGames(games.filter(game => game.id !== id));
    }

    return (
        <ProtectedRoute>
            <div className='main'>
                <Header title="Administrar videojuegos" />
                <Button title="+ Adicionar" action={() =>redirect("/add")} />
                <div style={{
                    width: '90%',
                    height: '550px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: "20px",
                    gap: '20px',
                    overflowY: 'auto',
                    scrollbarWidth: 'none'
                }}>
                    {games?.map((game, index) => (
                        <Game key={index} index={index} id={game.id} title={game.title} platform={game.platform.name} cover={game.cover} deleteAction={deleteAction} />
                    ))}
                </div>
            </div>
        </ProtectedRoute>
    )
}