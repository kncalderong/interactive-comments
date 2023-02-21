import Comment from './components/Comment'
import TextInput from "./components/TextInput";
import { Comment as CommentType } from './types/Comment'
import Modal from "./components/Modal";
import { useAppContext } from "./context/appContext";

function App() {
  
  const {comments} = useAppContext()
  
  return (
    <div className="flex justify-start bg-very-light-gray flex-col items-center gap-4 py-8 min-h-screen sm:py-12">
      {comments.map((commentData: CommentType) => {
        return (
          <Comment commentData={commentData}  isReply={false} key={commentData._id}/>
        )
      })}
      <TextInput isEditing={false} isReplying={false} />
      <Modal/>
    </div>
  );
}

export default App;
