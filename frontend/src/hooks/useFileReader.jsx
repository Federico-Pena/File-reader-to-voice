import { requestFile, getMimeTypes } from '@/utils/requestApi'
import { useFileReaderContext, useDataContext } from '@/hooks/useUseContext'
import { ACTIONS_LOCAL_DATA_TYPES } from '@/context/localDataContextReducer'
import { useEffect, useState } from 'react'

const useFileReader = () => {
  const { changeError, changeLoading } = useFileReaderContext()
  const { dispatch } = useDataContext()
  const [clientMimeTypes, setClientMimeTypes] = useState([])
  const [inputMimeTypes, setInputMimeTypes] = useState([])

  useEffect(() => {
    ;(async () => {
      const { data, error } = await getMimeTypes()
      if (error) {
        changeError(error.message)
        return
      }
      const clientMimeTypes = Object.values(data).map((type) => type.client)
      const inputMimeTypes = Object.values(data).map((type) => type.server)
      setClientMimeTypes(clientMimeTypes)
      setInputMimeTypes(inputMimeTypes)
    })()
  }, [changeError])
  const handleFileUpload = async (file) => {
    try {
      if (!file) {
        return
      }
      changeLoading(true)
      changeError('')
      const { data, error } = await requestFile(file)
      if (error) {
        changeError(error.message)
        return
      }
      dispatch({
        payload: data,
        type: ACTIONS_LOCAL_DATA_TYPES.SET_PARAGRAPHS
      })
      dispatch({
        payload: file.name,
        type: ACTIONS_LOCAL_DATA_TYPES.SET_NAME_FILE
      })
      window.speechSynthesis.cancel()
    } catch (error) {
      if (error) {
        changeError('Ocurrio un error al leer el archivo.')
      }
    } finally {
      changeLoading(false)
    }
  }

  return {
    handleFileUpload,
    clientMimeTypes,
    inputMimeTypes
  }
}
export default useFileReader
