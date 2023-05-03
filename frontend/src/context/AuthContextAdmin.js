import  React,{createContext, useReducer } from 'react'
import ReactDOM from 'react-dom';
import  { useState,useEffect } from "react";
import axios from "axios";

export const AuthContextAdmin = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { admin: action.payload }
    case 'LOGOUT':
      return { admin: null }
    default:
      return state
  }
}

export const AuthContextAdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    admin: null
  })





  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin'))

    if (admin) {
      dispatch({ type: 'LOGIN', payload: admin }) 
    }
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContextAdmin.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContextAdmin.Provider>
  )

}