const splitAndStyle = (sourceString: string = '') => {
    if (!sourceString.includes('@')) {
      return (
        <span> {sourceString} </span>
      )
    }    
    if (sourceString.includes('@')) {
      
      let finalText:string[] = []
      let tempTextToSlice = sourceString     
      
      const breakpoint = /(@)[^\s]+/gm;  // this will find all words that are a user reference i.e: @maxblagun
      
      //this function will split the sentence where the Regex is found, and the tempTextToSlice is updated with the remaining text
      const returnPrevWords = (sentence: any) => {
        const arrayOfWords = sentence.split(' ')
        const targetWord = arrayOfWords.find((value: any) => {
          return value.match(breakpoint)
        }) || ''
        const targetIndex = arrayOfWords.indexOf(targetWord)
        if (targetIndex === -1) {
          finalText.push(sentence)
          tempTextToSlice = ''
          return
        }
        if (targetIndex === 0) {
          tempTextToSlice = arrayOfWords.slice(targetIndex + 1).join(' ')
          finalText.push(arrayOfWords[0])
          return
        }
        if (targetIndex !== -1) {
          tempTextToSlice = arrayOfWords.slice(targetIndex).join(' ')
          finalText.push(arrayOfWords.slice(0, targetIndex).join(' '))
          return
        }
        return        
      }
      
      //this loop will split the sentence to allow differential handling of words that contains the symbol '@'
      while (tempTextToSlice.length > 0) {
        returnPrevWords(tempTextToSlice)
      }
      
      return (
        finalText.map((word: string, idx: number) => {
          return word.includes('@') ? <span className='text-moderate-blue font-bold ' key={idx}> {word}</span> : <span key={idx}> {word} </span>
        })
      )
    }
}

export default splitAndStyle