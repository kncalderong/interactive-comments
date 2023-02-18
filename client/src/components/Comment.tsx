import { useState, useEffect } from 'react';
import EditAndDelete from './buttons/EditAndDelete'
import Reply from './buttons/Reply' 
import SelectQuantity from './buttons/SelectQuantity';

type CommentProps = {
  isFromUser: boolean
  isReply: boolean
}

const Comment = (props: CommentProps) => {

  const {
    isFromUser,
    isReply
  } = props

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  console.log("windowSize: ", windowWidth)
  console.log(isFromUser);
  console.log(isReply);


  return (
    <div className={`${isReply ? 'w-[95%]' : 'w-[90%]' } p-4 bg-white rounded-lg sm:max-w-[720px] sm:p-6 flex-col flex sm:flex-row-reverse `}>
      <div>
        <div className='flex items-center mb-4 justify-between'>
          <div className='flex items-center gap-3 ' >
            <div className='w-[2rem]'>
            <img src="https://user-images.githubusercontent.com/80135017/218482952-66003814-ad3e-4482-b76e-694cf41368a5.png" alt="userImage" className='w-full block ' />
          </div>
          <p className='font-bold text-dark-blue '>
            amyrobson
          </p>
          {
            isFromUser && (<p className='flex rounded-sm bg-moderate-blue text-white  px-1 py-1 text-xs justify-center items-center h-[1.2rem] tracking-[0.03rem] ' >
              you
            </p>)
          }
          <p className='text-grayish-blue '>
            1 month ago
          </p>
          </div>
          <div >
          {isFromUser ? <EditAndDelete inMobile={false} /> : <Reply inMobile={false} />}
          </div>
        </div>
        <div className='text-grayish-blue mb-4' >Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.</div>
      </div>
      <div className='flex justify-between' >
        <SelectQuantity />
        {isFromUser ? <EditAndDelete inMobile={true} /> : <Reply inMobile={true} />}
      </div>
    </div>
  )
}

export default Comment
