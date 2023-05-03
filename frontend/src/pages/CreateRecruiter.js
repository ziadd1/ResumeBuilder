import React, { useState } from "react"
import { useCreateRecruiter } from "../hooks/useCreateRecruiter"
const CreateRecruiter = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [companyName, setCompanyName] = useState('')
  const {CreateRecruiter , error, isLoading , recruiterCreated } = useCreateRecruiter()


  const handleSubmit = async (e) => {
    e.preventDefault()

    await CreateRecruiter(username,email, password, companyName)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Create a Recruiter</h3>

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

<label>Company Name:</label>
      <input 
        type="text" 
        onChange={(e) => setCompanyName(e.target.value)} 
        value={companyName} 
      />

<button disabled={isLoading}>Sign up</button>
{recruiterCreated && <p>Recruiter created successfully!</p>}
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default CreateRecruiter