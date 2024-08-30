export const updateLocalStorage = (newPartialState) => {
  try {
    const dataLastFileString = window.localStorage.getItem('dataLastFile')
    if (dataLastFileString === null) {
      window.localStorage.setItem(
        'dataLastFile',
        JSON.stringify(newPartialState)
      )
    }
    const existingState = JSON.parse(dataLastFileString)
    const updatedState = {
      ...existingState,
      ...newPartialState
    }
    window.localStorage.setItem('dataLastFile', JSON.stringify(updatedState))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}
