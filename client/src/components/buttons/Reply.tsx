import { IconReply } from '../../assets/index.js';

type ReplyProps = {
  inMobile: boolean
}

const Reply = (props: ReplyProps) => {
  
  const { inMobile} = props
  
  return (
    <div className={`flex items-center gap-2 ${inMobile ? 'sm:hidden' : 'hidden sm:flex'} cursor-pointer`}>
      <img src={IconReply} alt="replyIcon" /> <span className='text-moderate-blue font-semibold' >Reply</span>
    </div>
  )
}

export default Reply
