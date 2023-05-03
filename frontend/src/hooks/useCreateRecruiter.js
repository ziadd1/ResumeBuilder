import { useState } from 'react'
import { useAuthContextRecruiter } from './useAuthContextRec'

export const useCreateRecruiter = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [recruiterCreated, setRecruiterCreated] = useState(false)

  const CreateRecruiter = async (username,email, password , companyName) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:4000/api/admin/CreateRecruiterr', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username,email, password, companyName })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
    //   // save the admin to local storage
    //   localStorage.setItem('admin', JSON.stringify(json))

     
   // set adminCreated to true
   setRecruiterCreated(true)

      // update loading state
      setIsLoading(false)
    }
  }

  return { CreateRecruiter, isLoading, error, recruiterCreated  }
}