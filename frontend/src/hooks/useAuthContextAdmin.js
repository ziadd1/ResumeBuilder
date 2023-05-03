import { AuthContextAdmin } from "../context/AuthContextAdmin"
import { useContext } from "react"

export const useAuthContextAdmin = () => {
  const context = useContext(AuthContextAdmin)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}