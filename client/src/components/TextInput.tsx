
type TextInputProps = {
  isEdit: boolean
  isReply: boolean
}


const TextInput = (props: TextInputProps) => {
  
  const { isEdit, isReply } = props
  
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.log('form submission', isEdit);
  }
  
  return (
      <form onSubmit={onSubmit} className={`${isReply ? 'w-[95%]' : 'w-[90%]' } p-4 bg-white rounded-lg sm:max-w-[720px] sm:p-6`}>
        <div className="mb-2" >
          <textarea name="contentText" id="contentText" cols={30} rows={3} placeholder="Add a comment..." className="resize-none focus-visible:outline-none border-light-gray rounded-md border-2 w-100 px-5 py-2 placeholder-grayish-blue text-grayish-blue  " ></textarea>
      </div>
      <div className="flex justify-between items-center" >
        <div className="w-[2rem]">
          <img src="https://user-images.githubusercontent.com/80135017/218482952-66003814-ad3e-4482-b76e-694cf41368a5.png" alt="userImage" className="w-full block" />
        </div>
        <button type="submit" className="bg-moderate-blue text-white px-7 py-2 text-[0.8rem] rounded-md uppercase " >
          SEND
        </button>
      </div>
        
      </form>
  )
}

export default TextInput
