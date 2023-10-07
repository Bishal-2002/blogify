import Editor from '../../Editor'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { UserContext } from '../../context/UserContext';

import { useState, useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom'

import './style.scss'

const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [summary, setSummary] = useState("")
    const [content, setContent] = useState("")
    const [files, setFiles] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const {userInfo} = useContext(UserContext)

    if(!userInfo)   {
        return <Navigate to={'/login'}/>
    }

    const CreatePost = async (evt) => {
        
        const formData = new FormData()
        formData.set('title', title)
        formData.set('summary', summary)
        formData.set('content', content)
        formData.set('image', files[0])
        
        evt.preventDefault()
        
        const response = await fetch('https://blogify-bishal.vercel.app/api/post', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        })

        if(response.ok) { setRedirect(true) }
        else alert('Something went wrong! Please try again.')
    }

    if(redirect)    return <Navigate to={'/'}/>

    return (
        <form className='createPostForm' onSubmit={CreatePost}>
            <input 
                type="title" 
                placeholder="Title"
                value={title}
                onChange={(evt) => setTitle(evt.target.value)}
            />

            <input 
                type="summary"
                placeholder="Summary"
                value={summary}
                onChange={(evt) => setSummary(evt.target.value)}
            />

            <input 
                type="file" 
                onChange={(evt) => setFiles(evt.target.files)}
            />

            <Editor value={content} onChange={setContent} />
            <button>Create Post</button>
        </form>
    )
} 

export default CreatePost