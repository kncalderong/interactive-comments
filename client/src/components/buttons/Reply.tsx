import { IconReply } from '../../assets/index.js';

type ReplyProps = {
  inMobile: boolean
  toggleUserAction(action:string ): void 
}

const Reply = (props: ReplyProps) => {
  
  const { inMobile, toggleUserAction} = props

  
  return (
    <div className={`flex items-center gap-2 ${inMobile ? 'sm:hidden' : 'hidden sm:flex'} cursor-pointer hover:opacity-50`} onClick={()=>{toggleUserAction('replyToggle') }}>
      <img src={IconReply} alt="replyIcon" /> <span className='text-moderate-blue font-semibold' >Reply</span>
    </div>
  )
}

export default Reply
