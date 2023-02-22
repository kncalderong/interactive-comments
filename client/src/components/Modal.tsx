import ReactDOM from 'react-dom'
import { useAppContext } from "../context/appContext";

const Modal = () => {
  
  const {isModalOpen, toggleModal } = useAppContext()

  if (!isModalOpen) return null

  return ReactDOM.createPortal(
    <>
      <div className='fixed top-0 left-0 right-0 bottom-0 z-[1000]' style={{ backgroundColor: 'rgba(0, 0, 0, .7)' }} onClick={() => toggleModal('close')} ></div> {/*This is the overlay*/}
      <div className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-6 z-[1000] rounded-lg w-[90vw] max-w-[370px] sm:p-7' >
        <div className="">
          <h2 className="text-dark-blue font-bold text-xl mb-3 " >Delete comment</h2>
          <p className="text-grayish-blue mb-5 " >Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
          <div className="flex gap-3 justify-center items-center" >
            <div className="text-md rounded-lg text-white bg-grayish-blue uppercase px-5 py-3 flex grow justify-center items-center cursor-pointer " onClick={() => toggleModal('close')} >No, Cancel</div>
            <div className="text-md rounded-lg text-white bg-soft-red uppercase px-5 py-3 flex grow justify-center items-center cursor-pointer" >Yes, Delete</div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('modal') as HTMLElement
  )
}

export default Modal
