
import currentUser from "../utils/CurrentUser"
import { useAppContext } from "../context/appContext";
import { useState } from "react";
import { updateInput as updateInputType, Answer as AnswerType } from '../types/Comment'

type TextInputProps = {
  isEditing: boolean
  isReplying: boolean
  initialText?: string
  isReply: boolean
  id: string
}

const TextInput = (props: TextInputProps) => {

  const { isEditing, isReplying, initialText = '', isReply, id } = props
  const [textInput, setTextInput] = useState<string>(initialText)
  
  const { createComment, updateComment, selectedCommentInfo } = useAppContext()

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    
    //create new comment
    if (!isEditing && !isReplying) {
      createComment(currentUser._id, textInput)
      return
    } 
    
    //edit comment
    if (isEditing && !isReply) {
      const {
        score = 0,
        _id,
        answers = []
      } = selectedCommentInfo
      
      const objToEdit: updateInputType = {
      text: textInput,
      score,
      answers: [...answers]
      }
      updateComment(objToEdit, _id)
    }
    
    //create a new reply
    if (!isEditing && isReplying && !isReply) {
      
      const {
        text,
        score = 0,
        _id,
        answers = []
      } = selectedCommentInfo

      const newReply: updateInputType = {
        text ,
        score,
        answers: [...answers, {
          user: currentUser._id,
          text: textInput,
          score: 0
        }]
      } 
      updateComment(newReply, _id)
    }
    
    //edit reply
    if (isEditing && isReply) {

      let commentWithNewReply = {...selectedCommentInfo}     
      if (commentWithNewReply.answers) {
        let replyToEdit = commentWithNewReply.answers.find((element: AnswerType) => {
          return element._id === id
        })
        const targetIndex = commentWithNewReply.answers.findIndex((element: AnswerType) => {
          return element._id === id
        })
        if (replyToEdit) {
          replyToEdit.text = textInput
          commentWithNewReply.answers[targetIndex] = replyToEdit 
          updateComment(commentWithNewReply, selectedCommentInfo._id)
        }
      }
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
