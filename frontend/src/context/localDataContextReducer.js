import { updateLocalStorage } from "@/utils/updateLocalStorage";

const localDataContextReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS_LOCAL_DATA_TYPES.SET_PARAGRAPHS:
      const paragraphs = payload.filter((paragraph) => paragraph.length !== 0);
      const paragraph = paragraphs[0];
      /*  .split("")
        .map((word, index) => {
          return payload[0][index].trim().length === 0 &&
            payload[0][index - 1].trim().length === 0
            ? ""
            : word;
        })
        .join(""); */
      updateLocalStorage({
        currentParagraphs: paragraph,
        textParagraphs: paragraphs,
        currentPage: 0,
        readedTextIndex: 0,
      });
      return {
        ...state,
        currentParagraphs: paragraph,
        textParagraphs: paragraphs,
        currentPage: 0,
        readedTextIndex: 0,
      };

    case ACTIONS_LOCAL_DATA_TYPES.SET_NAME_FILE:
      updateLocalStorage({
        nameFile: payload,
      });
      return {
        ...state,
        nameFile: payload,
      };

    case ACTIONS_LOCAL_DATA_TYPES.LOAD_STATE:
      const stringData = window.localStorage.getItem("dataLastFile");
      if (stringData === null) {
        return {
          ...state,
        };
      }
      const {
        nameFile,
        textParagraphs,
        currentPage,
        readedTextIndex,
        selectedVoice,
        currentParagraphs,
      } = JSON.parse(stringData);
      return {
        ...state,
        currentParagraphs: currentParagraphs || state.currentParagraphs,
        nameFile: nameFile || state.nameFile,
        textParagraphs: textParagraphs || state.textParagraphs,
        currentPage: currentPage || state.currentPage,
        readedTextIndex: readedTextIndex || state.readedTextIndex,
        selectedVoice: selectedVoice || state.selectedVoice,
      };

    case ACTIONS_LOCAL_DATA_TYPES.SET_READED_TEXT_INDEX:
      updateLocalStorage({
        readedTextIndex: payload,
      });
      return {
        ...state,
        readedTextIndex: payload,
      };

    case ACTIONS_LOCAL_DATA_TYPES.SET_VOICE_NAME:
      updateLocalStorage({
        selectedVoice: payload,
      });
      return {
        ...state,
        selectedVoice: payload,
      };

    case ACTIONS_LOCAL_DATA_TYPES.SET_CURRENT_PARAGRAPH:
      updateLocalStorage({
        currentParagraphs: payload,
      });
      return {
        ...state,
        currentParagraphs: payload,
      };

    case ACTIONS_LOCAL_DATA_TYPES.SET_PAGE:
      updateLocalStorage({
        currentPage: payload,
      });
      return {
        ...state,
        currentPage: payload,
      };

    default:
      return state;
  }
};

const ACTIONS_LOCAL_DATA_TYPES = {
  LOAD_STATE: "LOAD_STATE",
  SET_PARAGRAPHS: "SET_PARAGRAPHS",
  SET_CURRENT_PARAGRAPH: "SET_CURRENT_PARAGRAPH",
  SET_PAGE: "SET_PAGE",
  SET_READED_TEXT_INDEX: "SET_READED_TEXT_INDEX",
  SET_NAME_FILE: "SET_NAME_FILE",
  SET_VOICE_NAME: "SET_VOICE_NAME",
};
export { localDataContextReducer, ACTIONS_LOCAL_DATA_TYPES };
