import { createContext, useEffect, useReducer } from 'react'
import {
  ACTIONS_VOICES_TYPES,
  voiceContextReducer
} from './voiceContextReducer'

const initialState = {
  /**
   *
   * @param {{type: string, payload: any}} type: ACTIONS_VOICES_TYPES
   */
  // eslint-disable-next-line no-unused-vars
  dispatch: ({ type: ACTIONS_VOICES_TYPES, payload }) => {},
  voices: [],
  selectedVoice: null,
  speaking: false,
  rateUtterance: 1
}
const VoiceContext = createContext(initialState)

const VoiceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(voiceContextReducer, initialState)

  useEffect(() => {
    const populateVoices = () => {
      const availableVoices = window.speechSynthesis
        .getVoices()
        .filter((voice) => voice.lang.includes('es'))
      dispatch({
        type: ACTIONS_VOICES_TYPES.SET_VOICES,
        payload: availableVoices
      })
      const stringData = window.localStorage.getItem('dataLastFile')
      if (stringData !== null) {
        const { selectedVoice } = JSON.parse(stringData)
        if (selectedVoice)
          dispatch({
            type: ACTIONS_VOICES_TYPES.SET_VOICE,
            payload: selectedVoice
          })
      }
    }
    window.speechSynthesis.onvoiceschanged = () => populateVoices()
    populateVoices()
  }, [])

  return (
    <VoiceContext.Provider value={{ state, dispatch }}>
      {children}
    </VoiceContext.Provider>
  )
}

export { VoiceProvider, VoiceContext }
