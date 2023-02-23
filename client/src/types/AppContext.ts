import { Comment as CommentType } from '../types/Comment'

export type AppContextValue = {
  comments: CommentType[]
  isModalOpen: boolean
  toggleModal: (action: string) => void
  isLoading: boolean
  createComment: (user: string, text: string) => Promise<void>
  deleteComment: () => Promise<void>
  setIdCommentSelected: React.Dispatch<React.SetStateAction<string>>
}