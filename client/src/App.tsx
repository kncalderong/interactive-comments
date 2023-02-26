import Comment from './components/Comment'
import TextInput from "./components/TextInput";
import { Comment as CommentType } from './types/Comment'
import Modal from "./components/Modal";
import { useAppContext } from "./context/appContext";
import Spinner from './components/Spinner';

function App() {

  const { comments, isLoading } = useAppContext()

  return (
    <div className={`flex ${isLoading ? 'justify-center' : 'justify-start'} bg-very-light-gray flex-col items-center gap-4 py-8 min-h-screen sm:py-12`}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {comments.map((commentData: CommentType) => {
            return (
              <Comment commentData={commentData} isReply={false} key={commentData._id} />
            )
          })}
            <TextInput isEditing={false} isReplying={false} isReply={false} />
          <Modal />
        </>
      )}
    </div>
  );
}

export default App;
