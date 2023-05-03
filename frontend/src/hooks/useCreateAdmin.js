import { useState } from 'react'
import { useAuthContextAdmin } from './useAuthContextAdmin'

export const useCreateAdmin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [adminCreated, setAdminCreated] = useState(false)

  const createAdmin = async (username,email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:4000/api/admin/CreateAdmin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username,email, password })
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
   setAdminCreated(true)

      // update loading state
      setIsLoading(false)
    }
  }

  return { createAdmin, isLoading, error, adminCreated  }
}