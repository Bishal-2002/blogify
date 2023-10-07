import { useState, useEffect } from 'react'
import MoonLoader from 'react-spinners/MoonLoader'

import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import Post from '../../components/post/Post'
import './style.scss'

const Home = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch('https://blogify-bishal.vercel.app/api/post')
            .then(response => response.json())
            .then(posts => {
                setPosts(posts)
                setLoading(false)
            })
    }, [])

    return (
        <ContentWrapper>
            { loading && <div className='loader'><MoonLoader loading={loading} size={100} /></div> }
            { posts.map((post) => <Post key={post._id} postDoc={post}/>) }
        </ContentWrapper>
    )
}

export default Home