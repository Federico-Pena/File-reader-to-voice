import { useContext } from "react";
import { FileReaderContext } from "@/context/FileReaderContext";
import { LocalDataContext } from "@/context/LocalDataContext";
import { VoiceContext } from "@/context/VoiceContext";

export const useFileReaderContext = () => {
  const { error, loading, changeError, changeLoading } =
    useContext(FileReaderContext);
  return { loading, error, changeError, changeLoading };
};
export const useVoiceContext = () => {
  const { state, dispatch } = useContext(VoiceContext);
  const { voices, selectedVoice, speaking, rateUtterance } = state;
  return { voices, selectedVoice, speaking, rateUtterance, dispatch };
};
export const useDataContext = () => {
  const { state, dispatch } = useContext(LocalDataContext);
  const {
    currentParagraphs,
    textParagraphs,
    currentPage,
    nameFile,
    readedTextIndex,
    selectedVoice,
  } = state;
  return {
    currentParagraphs,
    textParagraphs,
    currentPage,
    nameFile,
    readedTextIndex,
    dispatch,
    selectedVoice,
  };
};
