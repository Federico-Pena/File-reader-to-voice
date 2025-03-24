import { createContext, useState } from "react";

const initialState = {
  loading: false,
  error: "",
};
const FileReaderContext = createContext(initialState);

const FileReaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(initialState.loading);
  const [error, setError] = useState(initialState.error);

  const changeLoading = (boolean) => {
    setLoading(boolean);
  };
  const changeError = (error) => {
    setError(error);
  };
  return (
    <FileReaderContext.Provider
      value={{ loading, error, changeError, changeLoading }}
    >
      {children}
    </FileReaderContext.Provider>
  );
};

export { FileReaderProvider, FileReaderContext };
