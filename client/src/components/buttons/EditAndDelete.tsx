import React from 'react'
import { IconDelete, IconEdit } from '../../assets/index.js';

type EditAndDeleteProps = {
  inMobile: boolean
  toggleUserAction(action:string ): void 
}

const EditAndDelete = (props: EditAndDeleteProps) => {
  
  const { inMobile, toggleUserAction } = props
  
  return (
    <div className={`flex gap-4 ${inMobile ? 'sm:hidden' : 'hidden sm:flex' }`}>
      <div className='flex items-center gap-2 cursor-pointer hover:opacity-50'>
        <img src={IconDelete} alt="replyIcon" /> <span className='text-soft-red font-semibold' >Delete</span>
      </div>
      <div className='flex items-center gap-2 cursor-pointer hover:opacity-50' onClick={()=>{toggleUserAction('editToggle')}}>
        <img src={IconEdit} alt="replyIcon" /> <span className='text-moderate-blue font-semibold' >Edit</span>
      </div>
    </div>
  )
}

export default EditAndDelete
