import { requestFile } from "@/utils/requestFile";
import { useFileReaderContext, useDataContext } from "@/hooks/useUseContext";
import { ACTIONS_LOCAL_DATA_TYPES } from "@/context/localDataContextReducer";

export const useFileReader = () => {
  const { changeError, changeLoading } = useFileReaderContext();
  const { dispatch } = useDataContext();

  const handleFileUpload = async (file) => {
    try {
      if (!file) {
        return;
      }
      changeLoading(true);
      changeError("");
      const { data, error } = await requestFile(file);
      if (error) {
        changeError(error.message);
        return;
      }
      dispatch({
        payload: data,
        type: ACTIONS_LOCAL_DATA_TYPES.SET_PARAGRAPHS,
      });
      dispatch({
        payload: file.name,
        type: ACTIONS_LOCAL_DATA_TYPES.SET_NAME_FILE,
      });
      window.speechSynthesis.cancel();
    } catch (error) {
      changeError("Ocurrio un error al leer el archivo.");
    } finally {
      changeLoading(false);
    }
  };

  return {
    handleFileUpload,
  };
};
