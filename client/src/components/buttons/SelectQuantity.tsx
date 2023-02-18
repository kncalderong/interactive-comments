
import { IconMinus, IconPlus } from '../../assets/index.js';

const SelectQuantity = () => {
  return (
    <div className="flex p-2 bg-very-light-gray justify-between w-[100px] rounded-xl">
      <div className='flex w-4 justify-center items-center'>
        <img src={IconPlus} alt="plusIcon" />
      </div>
      <div className='flex w-4 justify-center items-center text-grayish-blue font-bold '>12</div>
      <div className='flex w-4 justify-center items-center'>
        <img src={IconMinus} alt="minusIcon" />
      </div>
    </div>
  )
}

export default SelectQuantity
