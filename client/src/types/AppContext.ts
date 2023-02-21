import { Comment as CommentType } from '../types/Comment'

export type AppContextValue = {
  getComments: () => Promise<void>
  comments: CommentType[]
  isModalOpen: boolean
  toggleModal: (action: string)=> void
}