export interface Comment {
  createdAt: string
  score: number
  text: string
  _id: string
  user: User
  answers?: [Answer]
}

export interface Answer {
  createdAt: string
  score: number
  text: string
  user: User
  _id: string
}

export type User = {
  _id: string
  image: string
  name: string
}

export type updateInput = {
  text: string
  score: number
  answers?: {
    text: string
    score: number
    user: string | User
    _id?: string
    createdAt?: string
  }[] | []
}


export type isHandlingReplyType = {
  isHandlingReply: boolean
  idReply: string
}