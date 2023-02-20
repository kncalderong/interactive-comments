import ReactDOM from 'react-dom'

type ModalProps = {
  isOpen: boolean
  onClose(): void
  children: React.ReactNode
} 

const Modal = ({ isOpen, children, onClose }: ModalProps) => {
  
  if (!isOpen) return null
  
  return ReactDOM.createPortal(
    <>
      <div className='fixed top-0 left-0 right-0 bottom-0 z-[1000]' style={{backgroundColor: 'rgba(0, 0, 0, .7)' }} onClick={()=>{onClose()}} ></div> {/*This is the overlay*/}
      <div className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-4 z-[1000]' >
      {children}
    </div>
    </>,
    document.getElementById('modal') as HTMLElement
  )
}

export default Modal
