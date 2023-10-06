import { useState, useEffect } from 'react'

import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import Post from '../../components/post/Post'
import './style.scss'

const Home = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetch('https://blogify-api-dnyo.onrender.com/post')
            .then(response => response.json())
            .then(posts => {
                setPosts(posts)
            })
    }, [])

    return (
        <ContentWrapper>
            {posts.map((post) => <Post key={post._id} postDoc={post}/>)}
        </ContentWrapper>
    )
}

export default Home