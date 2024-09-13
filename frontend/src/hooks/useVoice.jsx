import { ACTIONS_LOCAL_DATA_TYPES } from '@/context/localDataContextReducer'
import { ACTIONS_VOICES_TYPES } from '@/context/voiceContextReducer'
import { useDataContext, useVoiceContext } from '@/hooks/useUseContext'
import { useEffect } from 'react'
import useSpeechSynthesisUtterance from './useSpeechSynthesisUtterance'

const useVoice = () => {
  const { createUtterance } = useSpeechSynthesisUtterance()
  const {
    dispatch: dataDispatch,
    currentPage,
    currentParagraphs
  } = useDataContext()
  const { dispatch: voiceDispatch, speaking } = useVoiceContext()
  useEffect(() => {
    window.speechSynthesis.cancel()
  }, [])

  useEffect(() => {
    play()
  }, [currentPage])

  const changeVoice = (newVoice) => {
    stop()
    dataDispatch({
      type: ACTIONS_LOCAL_DATA_TYPES.SET_VOICE_NAME,
      payload: newVoice
    })
    voiceDispatch({
      type: ACTIONS_VOICES_TYPES.SET_VOICE,
      payload: newVoice
    })
  }

  const play = () => {
    if (!currentParagraphs) return
    const utterance = createUtterance()
    window.speechSynthesis.speak(utterance)
    speaking ? pause() : resume()
  }

  const pause = () => {
    window.speechSynthesis.pause()
    voiceDispatch({
      type: ACTIONS_VOICES_TYPES.SET_SPEAKING,
      payload: false
    })
  }

  const resume = () => {
    window.speechSynthesis.resume()
    voiceDispatch({
      type: ACTIONS_VOICES_TYPES.SET_SPEAKING,
      payload: true
    })
  }

  const stop = () => {
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

  return {
    changeVoice,
    play,
    stop
  }
}
export default useVoice
