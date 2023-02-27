import { updateInput as updateInputType, isHandlingReplyType, Comment as CommentType  } from '../types/Comment'

export type AppContextValue = {
  comments: CommentType[]
  isModalOpen: boolean
  toggleModal: (action: string) => void
  isLoading: boolean
  createComment: (user: string, text: string) => Promise<void>
  deleteComment: () => Promise<void>
  updateComment: ({ text, score, answers }: updateInputType, idCommentSelected: string) => Promise<void>
  selectedCommentInfo: CommentType
  setSelectedCommentInfo: React.Dispatch<React.SetStateAction<CommentType>>
  isHandlingReply: isHandlingReplyType
  setIsHandlingReply: React.Dispatch<React.SetStateAction<isHandlingReplyType>>
}