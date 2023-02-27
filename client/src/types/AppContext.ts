import { Comment as CommentType } from '../types/Comment'
import { updateInput as updateInputType } from '../types/Comment'

export type AppContextValue = {
  comments: CommentType[]
  isModalOpen: boolean
  toggleModal: (action: string) => void
  isLoading: boolean
  createComment: (user: string, text: string) => Promise<void>
  deleteComment: (idCommentSelected: string) => Promise<void>
  updateComment: ({ text, score, answers }: updateInputType, idCommentSelected: string) => Promise<void>
  selectedCommentInfo: CommentType | null
  setSelectedCommentInfo: React.Dispatch<React.SetStateAction<CommentType | null>>
}