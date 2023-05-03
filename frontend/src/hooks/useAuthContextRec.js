import { AuthContextRec } from "../context/AuthContextRec"
import { useContext } from "react"

export const useAuthContextRec = () => {
  const context = useContext(AuthContextRec)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}