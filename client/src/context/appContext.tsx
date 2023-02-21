import React, { useContext } from 'react'
import {AppContextValue} from '../types/AppContext'

const AppContext = React.createContext<AppContextValue | undefined>(undefined) ;

type AppProviderProps = {
  children: React.ReactNode
}

const AppProvider = ({children}: AppProviderProps) => {

  const getComments = async () => {
    console.log('get comments');
  }
  
  return (
    <AppContext.Provider
      value={{
        getComments
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
