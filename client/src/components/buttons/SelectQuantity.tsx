
import { IconMinus, IconPlus, IconPlusDark, IconMinusDark } from '../../assets/index.js';
import {useState} from 'react'

const SelectQuantity = () => {
  
  const [iconPlusToShow, setIconPlusToShow] = useState(IconPlus)
  const [iconMinusToShow, setIconMinusToShow] = useState(IconMinus)
  
  return (
    <div className="flex p-2 bg-very-light-gray justify-between w-[100px] rounded-lg sm:flex-col sm:w-auto sm:h-[100px] sm:mr-6 sm:p-[0.6rem] ">
      <div className='flex w-4 justify-center items-center basis-6 cursor-pointer ' onMouseEnter={()=> setIconPlusToShow(IconPlusDark)} onMouseLeave={()=> setIconPlusToShow(IconPlus)} >
        <img src={iconPlusToShow} alt="plusIcon" />
      </div>
      <div className='flex w-4 justify-center items-center text-moderate-blue font-bold basis-6 '>12</div>
      <div className='flex w-4 justify-center items-center basis-6 cursor-pointer' onMouseEnter={()=> setIconMinusToShow(IconMinusDark)} onMouseLeave={()=> setIconMinusToShow(IconMinus)}>
        <img src={iconMinusToShow} alt="minusIcon"  />
      </div>
    </div>
  )
}

export default SelectQuantity
