import React, { useState } from 'react'
import './Login.css'

import api from '../services/api'

import Logo from '../assets/logo.svg';


export default function Login({ history }) {
    const [username, setUsername] = useState('marcos')

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.post('/devs', {
            username
        })

        const { _id } = response.data

        history.push(`/dev/${_id}`)
    }
    return (

        <div className="login-container">
            <form
                onSubmit={handleSubmit}
            >
                <img src={Logo} className="App-logo" alt="logo" />
                <input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Digite seu usuario no GitHub"
                />
                <button type="submit"> Enviar </button>
            </form>

        </div>
    )
}
