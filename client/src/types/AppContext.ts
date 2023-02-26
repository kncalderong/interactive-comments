import { Comment as CommentType } from '../types/Comment'
import { updateInput as updateInputType } from '../types/Comment'

export type AppContextValue = {
  comments: CommentType[]
  isModalOpen: boolean
  toggleModal: (action: string) => void
  isLoading: boolean
  createComment: (user: string, text: string) => Promise<void>
  deleteComment: () => Promise<void>
  setIdCommentSelected: React.Dispatch<React.SetStateAction<string>>
  updateComment: ({ text, score, answers }: updateInputType) => Promise<void>
  idCommentSelected: string
}