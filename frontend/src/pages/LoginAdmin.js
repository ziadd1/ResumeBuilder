import React, { useState } from "react"
import { useLoginAdmin } from "../hooks/useLoginAdmin"
import './Login.css';

const LoginAdmin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLoginAdmin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <div class = "page">
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In as an Admin</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
   
<button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
    </div>
  )
}

export default LoginAdmin