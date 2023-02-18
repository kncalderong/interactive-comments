import { IconReply } from '../../assets/index.js';

const Reply = () => {
  return (
    <div className='flex items-center gap-2'>
      <img src={IconReply} alt="replyIcon" /> <span className='text-moderate-blue font-semibold' >Reply</span>
    </div>
  )
}

export default Reply
