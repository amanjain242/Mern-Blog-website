import { useContext, useState } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext)

    async function login(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo)
                setRedirect(true);
            })

        }
        else {
            alert('wrong credentials')
        }

    }
    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <form className="login" onSubmit={login}>
            <p className="form-title">Sign in to your account</p>
            <div className="input-container">
                <input type="text"
                    placeholder="Enter Your username"
                    value={username}
                    onChange={ev => setUsername(ev.target.value)} />
                <span>
                </span>
            </div>
            <div className="input-container">
                <input type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)} />
            </div>
            <button type="submit" className="submit">Login</button>
            <p class="signup-link">
                No account?
                <a href="">Sign up</a>
            </p>
        </form>
    )
}