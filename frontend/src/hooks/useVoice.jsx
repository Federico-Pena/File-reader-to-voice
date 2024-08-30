import { ACTIONS_LOCAL_DATA_TYPES } from "@/context/localDataContextReducer";
import { ACTIONS_VOICES_TYPES } from "@/context/voiceContextReducer";
import { useDataContext, useVoiceContext } from "@/hooks/useUseContext";
import { useEffect } from "react";

export const useVoice = () => {
  const {
    dispatch: dataDispatch,
    currentParagraphs,
    readedTextIndex,
  } = useDataContext();
  const {
    dispatch: voiceDispatch,
    rateUtterance,
    selectedVoice,
    speaking,
  } = useVoiceContext();

  useEffect(() => {
    window.speechSynthesis.cancel();
  }, []);

  const changeVoice = (newVoice) => {
    stop();
    dataDispatch({
      type: ACTIONS_LOCAL_DATA_TYPES.SET_VOICE_NAME,
      payload: newVoice,
    });
    voiceDispatch({
      type: ACTIONS_VOICES_TYPES.SET_VOICE,
      payload: newVoice,
    });
  };

  const play = () => {
    const textToRead = currentParagraphs
      .split("")
      .slice(readedTextIndex)
      .join("")
      .trim();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.voice = selectedVoice;
    utterance.rate = rateUtterance;
    const handleUtteranceEndOrError = () => {
      voiceDispatch({
        type: ACTIONS_VOICES_TYPES.SET_SPEAKING,
        payload: false,
      });
      dataDispatch({
        type: ACTIONS_LOCAL_DATA_TYPES.SET_READED_TEXT_INDEX,
        payload: 0,
      });
    };
    const handleUtteranceOnboundary = (event) => {
      if (event.name === "word") {
        dataDispatch({
          type: ACTIONS_LOCAL_DATA_TYPES.SET_READED_TEXT_INDEX,
          payload: readedTextIndex + event.charIndex,
        });
      }
    };

    utterance.onboundary = handleUtteranceOnboundary;
    utterance.onerror = handleUtteranceEndOrError;
    utterance.onend = handleUtteranceEndOrError;
    window.speechSynthesis.speak(utterance);
    voiceDispatch({
      type: ACTIONS_VOICES_TYPES.SET_SPEAKING,
      payload: true,
    });
    speaking ? pause() : resume();
  };

  const pause = () => {
    window.speechSynthesis.pause();
    voiceDispatch({
      type: ACTIONS_VOICES_TYPES.SET_SPEAKING,
      payload: false,
    });
  };
  const resume = () => {
    window.speechSynthesis.resume();
    voiceDispatch({
      type: ACTIONS_VOICES_TYPES.SET_SPEAKING,
      payload: true,
    });
  };
  const stop = () => {
    window.speechSynthesis.cancel();
    voiceDispatch({
      type: ACTIONS_VOICES_TYPES.SET_SPEAKING,
      payload: false,
    });
    dataDispatch({
      type: ACTIONS_LOCAL_DATA_TYPES.SET_READED_TEXT_INDEX,
      payload: 0,
    });
  };

  return {
    changeVoice,
    play,
    stop,
  };
};
