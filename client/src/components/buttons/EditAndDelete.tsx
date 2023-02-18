import React from 'react'
import { IconDelete, IconEdit } from '../../assets/index.js';

const EditAndDelete = () => {
  return (
    <div className='flex gap-4'>
      <div className='flex items-center gap-2'>
        <img src={IconDelete} alt="replyIcon" /> <span className='text-soft-red font-semibold' >Delete</span>
      </div>
      <div className='flex items-center gap-2'>
        <img src={IconEdit} alt="replyIcon" /> <span className='text-moderate-blue font-semibold' >Edit</span>
      </div>
    </div>
  )
}

export default EditAndDelete
