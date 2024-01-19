import React, { useContext, useEffect, } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
    const {setUserInfo,userInfo} = useContext(UserContext)
    useEffect(()=>{
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response =>{
            response.json().then(userInfo =>{
                setUserInfo(userInfo)
            })
        })
    }, [])

    function logout(){
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST',
        })
        setUserInfo(null);    
    }

    const username = userInfo?.username;
    return (
        <header>
        <Link to="/"  className="logo">MyBlog</Link>
        <nav>
            {username && (
                <>
                <span>Hello,@<strong>{username}</strong></span>
                <Link to="/create" className="button-link">Create New Post</Link>
                <a onClick={logout}  className="button-link">Logout</a>
                </>
            )}
            {!username && (
                <>
                <Link to="/login" className="button-link" >Login</Link>
                <Link to="/register" className="button-link">Register</Link>
                </>
            )}
        </nav>
       </header>
    );
}