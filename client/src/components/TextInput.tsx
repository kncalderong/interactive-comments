
type TextInputProps = {
  isEditing: boolean
  isReplying: boolean
}


const TextInput = (props: TextInputProps) => {
  
  const { isEditing, isReplying } = props
  
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.log('form submission', isEditing);
    console.log('form submission', isReplying);
  }
  
  return (
    <form onSubmit={onSubmit} className={`w-[95%] p-4 bg-white rounded-lg sm:max-w-[720px] sm:p-6 flex flex-col sm:flex-row sm:items-start sm:gap-5 `}>
      <div className="w-[2rem] hidden sm:block ">
          <img src="https://user-images.githubusercontent.com/80135017/218482952-66003814-ad3e-4482-b76e-694cf41368a5.png" alt="userImage" className="w-full block" />
        </div>
        <div className="mb-2 sm: grow" >
          <textarea name="contentText" id="contentText" cols={30} rows={3} placeholder="Add a comment..." className="resize-none focus-visible:outline-none border-light-gray rounded-md border-2 w-[100%] px-5 py-2 placeholder-grayish-blue text-grayish-blue  " ></textarea>
      </div>
      <div className="flex justify-between items-center" >
        <div className="w-[2rem] block sm:hidden ">
          <img src="https://user-images.githubusercontent.com/80135017/218482952-66003814-ad3e-4482-b76e-694cf41368a5.png" alt="userImage" className="w-full block" />
        </div>
        <button type="submit" className="bg-moderate-blue text-white px-6 py-2 text-[0.9rem] rounded-md uppercase " >
          SEND
        </button>
      </div>
        
      </form>
  )
}

export default TextInput
