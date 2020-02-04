import React, { useState } from 'react'
import './Login.css'

import Logo from '../assets/logo.svg';


export default function Login() {
    const [username, setUsername] = useState('')

    function handleSubmit(e) {
        e.preventDefault();

        console.log(username)
    }
    return (

        <div className="login-container">
            <h1>{username}</h1>
            <form
                onSubmit= {handleSubmit}
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
