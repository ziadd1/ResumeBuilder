import  React,{createContext, useReducer } from 'react'
import ReactDOM from 'react-dom';
import  { useState,useEffect } from "react";
import axios from "axios";

export const AuthContextRec = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { recruiter: action.payload }
    case 'LOGOUT':
      return { recruiter: null }
    default:
      return state
  }
}

export const AuthContextRecProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    recruiter: null
  })





  useEffect(() => {
    const recruiter = JSON.parse(localStorage.getItem('recruiter'))

    if (recruiter) {
      dispatch({ type: 'LOGIN', payload: recruiter }) 
    }
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContextRec.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContextRec.Provider>
  )

}