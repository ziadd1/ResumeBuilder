import { useAuthContextRec } from './useAuthContextRec'

export const useLogoutRec = () => {
  const { dispatch } = useAuthContextRec()

  const logoutRec = () => {
    // remove recruiter from storage
    localStorage.removeItem('recruiter')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
  }

  return { logoutRec }
}