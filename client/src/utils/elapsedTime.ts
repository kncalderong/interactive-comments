export const getElapsedTime = (dateInput: string) => {

    const now = new Date();
    const [day, month, year] = dateInput.split(',')[0].split('/')
    let hours: number = +dateInput.split(',')[1].split(':')[0]
    const minutes= dateInput.split(',')[1].split(':')[1]
    const seconds = dateInput.split(',')[1].split(':')[2].split(' ')[0]
    const isPM = dateInput.split(',')[1].split(':')[2].split(' ')[1].includes('p')
    
    if (isPM) {
      hours = +hours + 12
  }
  
    const targetDate = new Date(+year, +month - 1 , +day, hours, +minutes, +seconds)
    const elapsedSeconds = (+now - +targetDate) / 1000
    
    if (elapsedSeconds < 60)  {
      return 'now'
    }
    
    const elapsedMinutes = elapsedSeconds / 60
    if (elapsedMinutes >= 1 && elapsedMinutes < 60) {
      if (elapsedMinutes === 1) {
        return `1 minute ago`
      }
      return `${Math.floor(elapsedMinutes)} minutes ago`
    }
    
    const elapsedHours = elapsedMinutes / 60    
    if (elapsedHours >= 1 && elapsedHours <= 24) {
      if (elapsedHours === 1) {
        return `1 hour ago`
      }
      return `${Math.floor(elapsedHours)} hours ago`
    }
    
    const elapsedDays = elapsedHours / 24    
    if (elapsedDays >= 1 && elapsedDays <= 365) {
      if (elapsedDays === 1) {
        return `1 day ago`
      }
      return `${Math.floor(elapsedDays)} days ago`
    }
    
    const elapsedYears = elapsedDays / 365    
    if (elapsedYears >= 1) {
      if (elapsedYears === 1) {
        return `1 year ago`
      }
      return `${Math.floor(elapsedYears)} years ago`
    }
    return ''
  }