import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import { UserContext } from '../../context/UserContext';
import PageNotFound from '../pageNotFound/PageNotFound'
import './style.scss'

import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { formatISO9075 } from "date-fns";
import { BsFillTrash3Fill } from 'react-icons/bs'
import { FaPencilAlt } from 'react-icons/fa'
import MoonLoader from 'react-spinners/MoonLoader'

const PostPage = () => {
    const [postDoc, setPostDoc] = useState(null)
    const [redirectHome, setRedirectHome] = useState(false)
    const [loading, setLoading] = useState(true)
    const {userInfo} = useContext(UserContext)
    const {id} = useParams()

    const CSS_Override = { margin: "8rem auto" }

    useEffect(() => {
        fetch(`https://blogify-bishal.vercel.app/api/post/${id}`)
            .then((response) => {
                if(!response.ok) { setRedirectHome(true) }
                else return response.json()
            })
            .then((postDoc) => {
                setPostDoc(postDoc)
                setLoading(false)
            })        
    }, [])

    const DeletePost = () => {
        fetch(`https://blogify-bishal.vercel.app/api/post/${id}`, { method: 'DELETE' })
            .then((response) => {
                if(response.ok)  setRedirectHome(true)
            })
    }

    if(!userInfo)   return <Navigate to='/login'/>
    if(redirectHome)    return <Navigate to={'/'} />
    if(!postDoc)    return ''

    return (
        <div className="postPageDetails">
            <>
                <h1 className='title'>{postDoc.title}</h1>

                <div className="authorDetails">
                    <div className="authorName">{postDoc.author.username}</div>
                    <div className="createdAt">Published at {formatISO9075(new Date(postDoc.createdAt))}</div>
                    {
                        postDoc.author._id === userInfo.id?
                                <div className='icons'>
                                    <Link to={`/edit/${id}`}><FaPencilAlt /></Link>
                                    <BsFillTrash3Fill onClick={DeletePost}/>
                                </div>
                            : 
                                null
                    }
                </div>

                <div className="coverImage">
                    <img src={postDoc.cover.path} alt="" />
                </div>

                <div className="content" dangerouslySetInnerHTML={{__html:postDoc.content}} />
            </>
        </div>
    )
}

export default PostPage