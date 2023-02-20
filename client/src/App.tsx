import { useEffect, useState } from "react";
import Comment from './components/Comment'
import TextInput from "./components/TextInput";
import axios from 'axios'
import { Comment as CommentType } from './types/Comment'
import Modal from "./components/Modal";

function App() {
  
  const [comments, setComments] = useState<[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  
  const toggleModal = () => {
    setIsModalOpen(true)
  }

  const ininitalFetch = async () => {
    try {
      const res = await axios.get('/api/v1/comments')
      setComments(res?.data?.comments)
      console.log('res: ', res.data.comments);
      
    } catch (error) {
      console.log('Error fetching comments: ', error)
    }
  }

  useEffect(() => {
    ininitalFetch()
  }, [])

  return (
    <div className="flex justify-start bg-very-light-gray flex-col items-center gap-4 py-8 min-h-screen sm:py-12">
      {comments.map((commentData: CommentType) => {
        return (
          <Comment commentData={commentData}  isReply={false} key={commentData._id} toggleModal={toggleModal} />
        )
      })}
      <TextInput isEditing={false} isReplying={false} />
      <Modal isOpen={isModalOpen} onClose={()=>{setIsModalOpen(false)}} >
        Delete comment
      </Modal>
    </div>
  );
}

export default App;
