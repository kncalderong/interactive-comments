import React, { useContext, useState, useEffect } from 'react'
import { AppContextValue } from '../types/AppContext'
import axios from 'axios'

const AppContext = React.createContext<AppContextValue | undefined>(undefined) ;

type AppProviderProps = {
  children: React.ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => {
  
  const [comments, setComments] = useState<[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  

  const getComments = async () => {
    try {
      const res = await axios.get('/api/v1/comments')
      setComments(res?.data?.comments)
      
    } catch (error) {
      console.log('Error fetching comments: ', error)
    };
  }
  
  const toggleModal = (action: string) => {
    if (action === 'open') {
      setIsModalOpen(true)
    } 
    if (action === 'close') {
      setIsModalOpen(false)
    }
  }
  
  useEffect(() => {
    getComments()
  }, [])
  
  return (
    <AppContext.Provider
      value={{
        getComments,
        comments,
        isModalOpen,
        toggleModal,
        isLoading
      }}
    >
      {children} 
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext) as AppContextValue
}

export {AppProvider, useAppContext}
