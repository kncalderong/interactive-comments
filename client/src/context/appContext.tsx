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

  const createComment = async (user: string, text: string) => {
    setIsLoading(true)
    const objToSubmit = {
      user,
      score: 0,
      text,
      answers:[]
    }
    try {
      await axios.post('/api/v1/comments', objToSubmit)
      getComments()
      setIsLoading(false)
    } catch (error) {
      console.log('error creating comment: ', error);
      setIsLoading(false)
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
        isLoading,
        createComment
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
