import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Main.css'

import Logo from '../assets/logo.svg';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';
import itsamatch from '../assets/itsamatch.png'

import io from 'socket.io-client'

import api from '../services/api'
// import Axios from 'axios'

export default function Main({ match }) {

    const [user, setUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(null)

    useEffect(() => {

        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id
                }
            })

            setUser(response.data.user)
            setUsers(response.data.users)
        }
        loadUsers()
    }, [match.params.id])

    useEffect(() => {

        const socket = io('http://localhost:3333', {
            query: { user: match.params.id }
        })

        socket.on('match', dev => {
            setMatchDev(dev)
        })
    }, [match.params.id])

    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: {
                user: match.params.id
            }
        })

        setUsers(users.filter(user => user._id !== id))
    }

    async function handleDisLike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: {
                user: match.params.id
            }
        })

        setUsers(users.filter(user => user._id !== id))
    }
    return (

        <div className="main-container">
            <div className="user-header">
                    <img className="user-avatar" src={user.avatar}></img>
                <div className="user-container">
                    <strong className="user-name">{user.name}</strong>
                </div>
                    <Link to="/">
                        <img src={Logo} alt="Tindev" />
                    </Link>
            </div>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>
                            <div className="buttons">
                                <button className="button" onClick={() => handleDisLike(user._id)}>
                                    <img src={dislike} alt="dislike" />
                                </button>
                                <button className="button" onClick={() => handleLike(user._id)}>
                                    <img src={like} alt="like" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                    <div className="empty"> acabou :( </div>
                )}

            {matchDev && (
                <div className="match-container">
                    <img src={itsamatch} alt="Deu Match"></img>
                    <img className="avatar" src={matchDev.avatar} alt="Deu Match"></img>
                    <strong>{matchDev.name} </strong>
                    <p>{matchDev.bio}</p>
                    <button type="button" onClick={() => setMatchDev(null)} >FECHAR</button>

                </div>
            )}
        </div>
    )
}