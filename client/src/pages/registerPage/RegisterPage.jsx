import './style.scss'

import { useState } from 'react'
import { Navigate } from 'react-router-dom'

const RegisterPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)

    const register = async (evt) => {
        evt.preventDefault()
        const response = await fetch('https://blogify-bishal.vercel.app/api/register', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'content-Type': 'application/json'}
        })
        
        if(response.ok === true) { setRedirect(true) }
        else alert("Please, try again")
    }

    if(redirect)    return <Navigate to={'/login'}/>

    return (
        <form className='registerFormSection' onSubmit={register}>
            <h1>Register</h1>
            <input 
                type="text" 
                placeholder='Enter Username'
                value={username}
                onChange={(evt) => setUsername(evt.target.value)}
            />

            <input 
                type="password" 
                placeholder='Enter Password'
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
            />

            <button>Register</button>
        </form>
    )
}

export default RegisterPage