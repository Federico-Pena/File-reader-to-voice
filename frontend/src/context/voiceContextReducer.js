import { updateLocalStorage } from "@/utils/updateLocalStorage";

const voiceContextReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS_VOICES_TYPES.SET_VOICES:
      return {
        ...state,
        voices: payload,
      };
    case ACTIONS_VOICES_TYPES.SET_VOICE:
      const filteredVoice = state.voices.find(
        (voice) => voice.name === payload
      );
      if (!filteredVoice) {
        return state;
      }
      updateLocalStorage({
        selectedVoice: filteredVoice.name,
      });
      return {
        ...state,
        selectedVoice: filteredVoice,
      };
    case ACTIONS_VOICES_TYPES.SET_SPEAKING:
      return {
        ...state,
        speaking: payload,
      };
    case ACTIONS_VOICES_TYPES.SET_RATE_UTTERANCE:
      return {
        ...state,
        rateUtterance: payload,
      };
    default:
      return state;
  }
};

const ACTIONS_VOICES_TYPES = {
  SET_VOICE: "SET_VOICE",
  SET_VOICES: "SET_VOICES",
  SET_SPEAKING: "SET_SPEAKING",
  SET_RATE_UTTERANCE: "SET_RATE_UTTERANCE",
};
export { voiceContextReducer, ACTIONS_VOICES_TYPES };
