import { Link } from 'react-router-dom'
import { formatISO9075 } from "date-fns";

import './style.scss'

const Post = ({postDoc}) => {
    const postTitle = postDoc.title.length > 40? postDoc.title.substring(0, 40) + "...": postDoc.title
    const postSummary = postDoc.summary.length > 200? postDoc.summary.substring(0, 200) + "...": postDoc.summary

    return (
        <Link to={`/post/${postDoc._id}`} className='postSection'>
            <div className="postBody">
                <div className="img">
                    <img src={postDoc.cover.path} alt="" />
                </div>

                <div className="postDetails">
                    <h2 className="heading">{postTitle}</h2>
                    <p className="info">
                        <a className="author">{postDoc.author.username}</a>
                        <time>{formatISO9075(new Date(postDoc.createdAt))}</time>
                    </p>
                    <p className="summary">{postSummary}</p>
                </div>
            </div>
        </Link>
    )
}

export default Post