import React, { useState } from "react"
import { useSignup } from "../hooks/useSignup"
const Signup = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()


  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(username,email, password)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up as a User</h3>

      <label>UserName:</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username} 
      />
      
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

<button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup