import { useDataContext, useVoiceContext } from './useUseContext'
import { ACTIONS_LOCAL_DATA_TYPES } from '@/context/localDataContextReducer'
import { ACTIONS_VOICES_TYPES } from '@/context/voiceContextReducer'

const useSpeechSynthesisUtterance = () => {
  const {
    dispatch: dataDispatch,
    readedTextIndex,
    currentParagraphs,
    currentPage,
    textParagraphs
  } = useDataContext()
  const {
    dispatch: voiceDispatch,
    rateUtterance,
    selectedVoice
  } = useVoiceContext()
  const handleOnBoundary = (event) => {
    if (event.name === 'word') {
      dataDispatch({
        type: ACTIONS_LOCAL_DATA_TYPES.SET_READED_TEXT_INDEX,
        payload: readedTextIndex + event.charIndex
      })
    }
  }

  const handleOnEnd = () => {
    window.speechSynthesis.cancel()
    voiceDispatch({
      type: ACTIONS_VOICES_TYPES.SET_SPEAKING,
      payload: false
    })
    dataDispatch({
      type: ACTIONS_LOCAL_DATA_TYPES.SET_READED_TEXT_INDEX,
      payload: 0
    })
    if (currentPage < textParagraphs.length - 1) {
      const nextPage = currentPage + 1
      dataDispatch({
        type: ACTIONS_LOCAL_DATA_TYPES.SET_PAGE,
        payload: nextPage
      })
      dataDispatch({
        type: ACTIONS_LOCAL_DATA_TYPES.SET_CURRENT_PARAGRAPH,
        payload: textParagraphs[nextPage]
      })
    }
  }

  const createUtterance = () => {
    const textToRead = currentParagraphs
      .split('')
      .slice(readedTextIndex)
      .join('')
      .trim()
    const utterance = new SpeechSynthesisUtterance(textToRead)
    utterance.voice = selectedVoice
    utterance.rate = rateUtterance
    utterance.lang = selectedVoice?.lang || 'es-ES'
    utterance.onstart = () => {
      voiceDispatch({
        type: ACTIONS_VOICES_TYPES.SET_SPEAKING,
        payload: true
      })
    }
    utterance.onboundary = handleOnBoundary
    utterance.onend = handleOnEnd
    utterance.onerror = () => {
      window.speechSynthesis.cancel()
      voiceDispatch({
        type: ACTIONS_VOICES_TYPES.SET_SPEAKING,
        payload: false
      })
      dataDispatch({
        type: ACTIONS_LOCAL_DATA_TYPES.SET_READED_TEXT_INDEX,
        payload: 0
      })
    }
    return utterance
  }

  return { createUtterance }
}
export default useSpeechSynthesisUtterance
