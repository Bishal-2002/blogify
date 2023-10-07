import './style.scss'

import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { Navigate } from 'react-router-dom'


const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
    const {setUserInfo} = useContext(UserContext)

    const login = async(evt) => {
        evt.preventDefault()
        const response = await fetch('https://blogify-bishal.vercel.app/api/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'content-type': 'application/json'},
            credentials: 'include'
        })

        if(response.ok) {
            const userInfo = await response.json()
            setUserInfo(userInfo)
            setRedirect(true)
        }
        else alert('Wrong credentials!')
    }

    if(redirect)    return <Navigate to={'/'}/>

    return (
        <form className='loginFormSection' onSubmit={login}>
            <h1>Login</h1>
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

            <button>Login</button>
        </form>
    )
}

export default LoginPage