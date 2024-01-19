import { useState } from "react"

export default function RegisterPage(){

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  
  async function register(ev){
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/register' , {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type': 'application/json'},
    })
    if(response.status === 200){
      alert('registration successfull')
    }
    else{
      alert('registration failed')
    }
  }

    return (
      <form className="login" onSubmit={register}>
        <p className="form-title">Register Here!</p>
         <div className="input-container">
         <input type="text" placeholder="Create username" 
         value={username}
         onChange={ev => setUsername(ev.target.value)} />
         <span>
         </span>
         </div>
         <div className="input-container">
         <input type="Create password" 
        placeholder="password" 
        value={password}
        onChange={ev=> setPassword(ev.target.value)}/>
         </div>
        <button className="submit" type="submmit" > Sign Up</button>
      </form>
    )
}