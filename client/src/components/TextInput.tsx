
import currentUser from "../utils/CurrentUser"
import { useAppContext } from "../context/appContext";
import { useState } from "react";
import { Comment as CommentType } from '../types/Comment'

type TextInputProps = {
  isEditing: boolean
  isReplying: boolean
  initialText?: string
  commentData?: CommentType
  isReply: boolean
}

const TextInput = (props: TextInputProps) => {

  const { isEditing, isReplying, initialText = '', commentData, isReply } = props
  const [textInput, setTextInput] = useState<string>(initialText)
  
  const { createComment, updateComment } = useAppContext()

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!isEditing && !isReplying) {
      createComment(currentUser._id, textInput)
      return
    } 
    
    if (isEditing && !isReply) {

    let objToEdit = {
      text: textInput,
      score: (commentData?.score ? commentData?.score : 0),
      answers: commentData?.answers
      }
      updateComment(objToEdit)
    }
  
  }
  
  const handleTextChange = (e: any) => {
    setTextInput(e.target.value)
  }

  return (
    <form onSubmit={onSubmit} className={`${isEditing ? 'w-[100%] p-0 sm:p-0' : 'w-[95%] p-4 sm:p-6'} bg-white rounded-lg sm:max-w-[720px]  flex flex-col sm:flex-row sm:items-start sm:gap-5 ${isEditing && 'sm:flex-col sm:items-end sm:gap-0'}  `}>
      {!isEditing && (
        <div className="w-[2rem] hidden sm:block ">
          <img src={currentUser.image } alt="userImage" className="w-full block" />
        </div>)}
      <div className={`mb-2 sm:grow ${isEditing && 'w-[100%]'}`} >
        <textarea name="contentText" id="contentText" cols={30} rows={isEditing ? 4 : 3} placeholder="Add a comment..." className="resize-none focus-visible:outline-none border-light-gray rounded-md border-2 w-[100%] px-5 py-2 placeholder-grayish-blue text-grayish-blue  " value={textInput} onChange={handleTextChange} ></textarea>
      </div>
      <div className={ `flex  items-center ${isEditing ? 'mb-2 justify-end' : 'justify-between'}`} >
        {!isEditing && (
          <div className="w-[2rem] block sm:hidden ">
            <img src={currentUser.image} alt="userImage" className="w-full block" />
          </div>
        )}
        <button type="submit" className="bg-moderate-blue text-white px-6 py-2 text-[0.9rem] rounded-md uppercase " >
          {isReplying ? 'reply' : isEditing ? 'update' : 'send'}
        </button>
      </div>

    </form>
  )
}

export default TextInput
