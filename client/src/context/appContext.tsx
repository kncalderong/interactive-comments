import React, { useContext, useState, useEffect } from 'react'
import { AppContextValue } from '../types/AppContext'
import { updateInput as updateInputType, Comment as CommentType, isHandlingReplyType, Answer as AnswerType } from '../types/Comment';
import axios from 'axios'

const AppContext = React.createContext<AppContextValue | undefined>(undefined);

type AppProviderProps = {
  children: React.ReactNode
}


const AppProvider = ({ children }: AppProviderProps) => {

  const [comments, setComments] = useState<[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isHandlingReply, setIsHandlingReply] = useState<isHandlingReplyType>({
    isHandlingReply: false,
    idReply: ''
  })

  const [selectedCommentInfo, setSelectedCommentInfo] = useState<CommentType>({
    _id: '',
    createdAt: '',
    score: 0,
    text: '',
    user: {
      _id: '',
      image: '',
      name: ''
    }
  })


  const getComments = async () => {
    try {
      const res = await axios.get('/api/v1/comments?sort=higher')
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
      answers: []
    }
    try {
      await axios.post('/api/v1/comments', objToSubmit)
      await getComments()
      setIsLoading(false)
    } catch (error) {
      console.log('error creating comment: ', error);
      setIsLoading(false)
    }
  }

  const deleteComment = async () => {
    setIsLoading(true)
    if (!isHandlingReply.isHandlingReply) {
      try {
        await axios.delete(`/api/v1/comments/${selectedCommentInfo._id}`)
        await getComments()
        setIsModalOpen(false)
        setIsLoading(false)
      } catch (error) {
        console.log('error deleting comment: ', error);
        setIsModalOpen(false)
        setIsLoading(false)
      }
    }
    if (isHandlingReply.isHandlingReply) {
      let commentWithoutThatReply = {...selectedCommentInfo}
      if (commentWithoutThatReply.answers) {
        const targetIndex = commentWithoutThatReply.answers.findIndex((element: AnswerType) => {
          return element._id === isHandlingReply.idReply
        })
        if (targetIndex > -1) {
          commentWithoutThatReply.answers.splice(targetIndex, 1)
          try {
            await updateComment(commentWithoutThatReply, selectedCommentInfo._id)
            setIsModalOpen(false)
            await getComments()            
            setIsLoading(false)
          } catch (error) {
            console.log('error deleting reply: ', error);
            setIsModalOpen(false)
            setIsLoading(false)
          }          
        }
      }
    }
  }

  const updateComment = async ({ text, score, answers }: updateInputType, idCommentSelected: string) => {
    const newComment = {
      text,
      score,
      answers
    }
    setIsLoading(true)
    try {
      await axios.patch(`/api/v1/comments/${idCommentSelected}`, newComment)
      await getComments()
      setIsLoading(false)
    } catch (error) {
      console.log('error updating comment: ', error);
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getComments()
  }, [])

  return (
    <AppContext.Provider
      value={{
        comments,
        isModalOpen,
        toggleModal,
        isLoading,
        createComment,
        deleteComment,
        updateComment,
        selectedCommentInfo,
        setSelectedCommentInfo,
        isHandlingReply,
        setIsHandlingReply        
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext) as AppContextValue
}

export { AppProvider, useAppContext }
