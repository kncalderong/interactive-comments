import EditAndDelete from './buttons/EditAndDelete'
import Reply from './buttons/Reply'
import SelectQuantity from './buttons/SelectQuantity';
import { useState } from 'react';
import TextInput from './TextInput';
import { Comment as CommentType } from '../types/Comment'
import { Answer as AnswerType } from '../types/Comment'
import currentUser from '../utils/CurrentUser';
import { useAppContext } from "../context/appContext";
import { getElapsedTime } from '../utils/elapsedTime';
import splitAndStyle from '../utils/SplitAndStyle';

type CommentProps = {
  isReply: boolean
  commentData: CommentType
  parentData: CommentType | null
}

const Comment = (props: CommentProps) => {
  const {
    isReply,
    commentData: {
      createdAt,
      score,
      text,
      user,
      answers,
      _id
    },
  } = props

  const { toggleModal, setSelectedCommentInfo, setIsHandlingReply, updateComment } = useAppContext()

  const [isReplying, setIsReplying] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  //This handle the action of user: edit, reply and delete actions. 
  // If the reply or edit is made in the answers of a comment, the handle is to modify the array of answers of current comment, so the info needed is from the parent comment 'parentData'
  const toggleUserAction = (action: string) => {
    setSelectedCommentInfo(() => {
      if (isReply && props.parentData) {
        return props.parentData
      }
      return props.commentData
    })
    setIsHandlingReply(() => {
      if (isReply) {
        return {
          isHandlingReply: true,
          idReply: _id
        }
      }
      return {
        isHandlingReply: false,
        idReply: ''
      }
    })

    if (action === 'replyToggle') {
      setIsReplying(!isReplying)
    }
    if (action === 'editToggle') {
      setIsEditing(!isEditing)
    }
    if (action === 'deleteToggle') {
      toggleModal('open')
    }
  }

  //to update quantity score
  const handleScore = (action: 'plus' | 'minus') => {
    if ((score > 99 && action === 'plus') || (score < 1 && action === 'minus')) { // score boundaries added
      return
    }
    if (isReply) {
      const idOfCommentParent = props.parentData?._id || ''
      if (props.parentData) {
        let commentWithNewReply = { ...props.parentData }
        if (commentWithNewReply.answers) {
          let replyToEdit = commentWithNewReply.answers.find((element: AnswerType) => {
            return element._id === _id
          })
          const targetIndex = commentWithNewReply.answers.findIndex((element: AnswerType) => {
            return element._id === _id
          })
          if (replyToEdit) {
            replyToEdit.score = action === 'plus' ? score + 1 : score - 1
            commentWithNewReply.answers[targetIndex] = replyToEdit
            updateComment(commentWithNewReply, idOfCommentParent)
          }
        }
      }
    }
    if (!isReply) {
      let commentWithNewScore = {
        ...props.commentData,
        score: action === 'plus' ? score + 1 : score - 1
      }
      updateComment(commentWithNewScore, _id)
    }
  }
  
  return (
    <>
      <div className={`${isReply ? 'w-[95%]' : 'w-[90%]'} p-4 bg-white rounded-lg sm:max-w-[720px] sm:p-6 flex-col flex sm:flex-row-reverse `}>
        <div className='grow'>
          <div className='flex items-center mb-4 justify-between'>
            <div className='flex items-center gap-3 ' >
              <div className='w-[2rem]'>
                <img src={user.image} alt="userImage" className='w-full block ' />
              </div>
              <p className='font-bold text-dark-blue '>
                {user.name}
              </p>
              {
                (user._id === currentUser._id) && (<p className='flex rounded-sm bg-moderate-blue text-white  px-1 py-1 text-xs justify-center items-center h-[1.2rem] tracking-[0.03rem] ' >
                  you
                </p>)
              }
              <p className='text-grayish-blue '>
                {getElapsedTime(createdAt)}
              </p>
            </div>
            <div >
              {(user._id === currentUser._id) ? <EditAndDelete inMobile={false} toggleUserAction={toggleUserAction} /> : <Reply inMobile={false} toggleUserAction={toggleUserAction} />}
            </div>
          </div>
          {isEditing ? <TextInput isEditing={true} isReplying={false} initialText={text} isReply={isReply} /> : <div className='text-grayish-blue mb-4' >{splitAndStyle(text)}</div>}
        </div>
        <div className='flex justify-between' >
          <SelectQuantity score={score} handleScore={handleScore} />
          {(user._id === currentUser._id) ? <EditAndDelete inMobile={true} toggleUserAction={toggleUserAction} /> : <Reply inMobile={true} toggleUserAction={toggleUserAction} />}
        </div>
      </div>
      {isReplying && <TextInput isEditing={false} isReplying={true} isReply={isReply} />}

      {(answers !== undefined && answers?.length > 0) && (
        <div className="w-[90%] justify-start flex flex-col items-end gap-4 border-l-2 border-l-light-gray sm:max-w-[685px] sm:ml-[35px]">
          {answers?.map((answer: AnswerType) => {
            return (
              <Comment isReply={true} commentData={answer} key={answer._id} parentData={props.commentData} />
            )
          })}
        </div>
      )}
    </>
  )
}

export default Comment
