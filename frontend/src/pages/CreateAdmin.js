import React, { useState } from "react"
import { useCreateAdmin } from "../hooks/useCreateAdmin"
const CreateAdmin = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {createAdmin, error, isLoading , adminCreated } = useCreateAdmin()


  const handleSubmit = async (e) => {
    e.preventDefault()

    await createAdmin(username,email, password)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Create an Admin</h3>

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
{adminCreated && <p>Admin created successfully!</p>}
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default CreateAdmin