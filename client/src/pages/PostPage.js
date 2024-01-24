import { formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../UserContext";
import { Link} from "react-router-dom"


export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext)
    const { id } = useParams();
   

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/post/${id}`, {
                method: 'DELETE',
                credentials: 'include', // Send cookies with the request
            });

            if (response.ok) {
                // Post deleted successfully, redirect to the home page
                window.location.href = '/';
            } else {
                // Handle error (e.g., display an error message)
                console.error('Error deleting post');
            }
        } catch (error) {
            console.error('Error deleting post', error);
        }
    };
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo)
                })
            })
    }, [])
    if (!postInfo)
        return '';
    return (
        <div className="post-page">
            <h1>{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className="author">by @{postInfo.author.username}</div>
            {userInfo.id === postInfo.author._id && (
                <div className="edit-row">
                    <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        Edit this post
                    </Link>
                    <Link className="edit-btn" onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z"/> <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"/> </g> </svg>
                        Delete this post
                    </Link>
                </div>
            )}
            <div className="image">
                <img src={`http://localhost:4000/${postInfo.cover}`} alt='' />
            </div>
            <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        </div>
    )
}