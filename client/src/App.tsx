import { useEffect } from "react";
import Comment from './components/Comment'

function App() {
  
  const ininitalFetch = async () => {
    const res = await fetch('/api/v1/comments')
    const json = await res.json()
    console.log(json)  
  }
  
  useEffect(() => {
    ininitalFetch()
  }, [])
  
  return (
    <div className="flex justify-start bg-very-light-gray flex-col items-center gap-4 py-8 min-h-screen sm:py-12">
      <Comment isFromUser={false} isReply={false} />
      <Comment isFromUser={true} isReply={false} />
      {/*Example of replies */}
      <div className="w-[90%] justify-start flex flex-col items-end gap-4 border-l-2 border-l-light-gray sm:max-w-[685px] sm:ml-[35px]">
        <Comment isFromUser={false} isReply={true} />
        <Comment isFromUser={true} isReply={true} />
      </div>
      
    </div>
  );
}

export default App;
