import { createContext, useEffect, useReducer } from "react";
import {
  ACTIONS_LOCAL_DATA_TYPES,
  localDataContextReducer,
} from "@/context/localDataContextReducer";

const initialState = {
  currentParagraphs: "",
  textParagraphs: [],
  currentPage: 0,
  nameFile: "",
  readedTextIndex: 0,
  selectedVoice: {},
};
const LocalDataContext = createContext(initialState);

const LocalDataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(localDataContextReducer, initialState);
  useEffect(() => {
    dispatch({
      type: ACTIONS_LOCAL_DATA_TYPES.LOAD_STATE,
    });
  }, []);
  return (
    <LocalDataContext.Provider value={{ state, dispatch }}>
      {children}
    </LocalDataContext.Provider>
  );
};

export { LocalDataContextProvider, LocalDataContext };
