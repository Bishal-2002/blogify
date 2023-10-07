import { Link } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { useContext, useEffect } from "react"

import ContentWrapper from '../contentWrapper/ContentWrapper'
import './style.scss'

const Header = () => {
    const {userInfo, setUserInfo} = useContext(UserContext)
    
    useEffect(() => {
        fetch('https://blogify-bishal.vercel.app/api/profile', {credentials: 'include'})
            .then((response) => {
                if(!response.ok) { setUserInfo(null) }
                else return response.json()
            })
            .then((userInfo) => {
                setUserInfo(userInfo)
            })
    }, [])

    const logout = async() => {
        const response = fetch('https://blogify-bishal.vercel.app/api/logout', {
            method: 'POST',
            credentials: 'include'
        })
        setUserInfo(null)
    }
    
    const username = userInfo?.username

    return (
        <ContentWrapper>
            <header className="headerSection">
                <Link to="/" id="logo">MyBlog</Link>
                <nav className="mainNav">
                    {!username && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                    {username && (
                        <>
                            <Link to={'/createPost'}>Create</Link>
                            <a onClick={logout}>Sign Out</a>
                        </>
                    )}
                </nav>
            </header>
        </ContentWrapper>
    )
}

export default Header