import { useAuthContextAdmin } from './useAuthContextAdmin'

export const useLogoutAdmin = () => {
  const { dispatch } = useAuthContextAdmin()

  const logoutAdmin = () => {
    // remove user from storage
    localStorage.removeItem('admin')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
  }

  return { logoutAdmin }
}