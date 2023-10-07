import Editor from '../../Editor'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import './style.scss'

const EditPost = () => {
    const [title, setTitle] = useState("")
    const [summary, setSummary] = useState("")
    const [content, setContent] = useState("")
    const [files, setFiles] = useState(null)
    const [redirectHome, setRedirectHome] = useState(false)

    const {id} = useParams()
    const [oldImage, setOldImage] = useState(null)

    useEffect(() => {
        fetch(`https://blogify-bishal.vercel.app/api/post/${id}`)
            .then(response => {
                if(!response.ok) { setRedirectHome(true) }
                else return response.json()
            })
            .then((postDoc) => {
                setTitle(postDoc.title)
                setContent(postDoc.content)
                setSummary(postDoc.summary)
                setOldImage(postDoc.cover.fileName)
            })
    }, [])

    const EditPost = async (evt) => {
        
        const formData = new FormData()
        formData.set('title', title)
        formData.set('summary', summary)
        formData.set('content', content)
        formData.set('newImage', files[0])
        formData.set('oldImage', oldImage? oldImage : null)
        
        evt.preventDefault()
        
        const response = await fetch(`https://blogify-bishal.vercel.app/api/post/${id}`, {
            method: 'PUT',
            body: formData,
            credentials: 'include'
        })

        if(response.ok) { setRedirectHome(true) }
    }

    if(redirectHome)    return <Navigate to={'/'}/>

    return (
        <form className='editPostForm' onSubmit={EditPost}>
            <input 
                type="title" 
                placeholder="Title"
                value={title}
                onChange={(evt) => setTitle(evt.target.value)}
                required
            />

            <input 
                type="summary"
                placeholder="Summary"
                value={summary}
                onChange={(evt) => setSummary(evt.target.value)}
                required
            />

            <input 
                type="file" 
                onChange={(evt) => setFiles(evt.target.files)}
                required
            />

            <Editor value={content} onChange={setContent} />
            <button>Edit Post</button>
        </form>
    )
} 

export default EditPost