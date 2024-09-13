const ERROR_TYPE = 'ApiError'
const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:1234/api/v1'
    : '/api/v1'
const POST_FILE_URL = `${BASE_URL}/upload-file`
const GET_MIME_TYPES_URL = `${BASE_URL}/get-mime-types`

const requestFile = async (file) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch(POST_FILE_URL, {
      body: formData,
      method: 'POST'
    })
    if (response.status === 500) {
      return { error: { message: 'Error inesperado intentalo nuevamente.' } }
    }
    const { data, error } = await response.json()

    if (error) {
      if (error.type === ERROR_TYPE) {
        return { error: { type: error.type, message: error.message } }
      }
      return { error: { message: 'Ocurrió un error al leer el archivo' } }
    }
    return { data }
  } catch (error) {
    if (error.type === ERROR_TYPE) {
      return { error: { type: error.type, message: error.message } }
    }
    return { error: { message: 'Ocurrió un error al leer el archivo' } }
  }
}

const getMimeTypes = async () => {
  try {
    const response = await fetch(GET_MIME_TYPES_URL)

    const { data, error } = await response.json()

    if (error) {
      if (error.type === ERROR_TYPE) {
        return { error: { type: error.type, message: error.message } }
      }
      return {
        error: { message: 'Ocurrió un error inesperado, inténtelo más tarde.' }
      }
    }
    return { data }
  } catch (error) {
    if (error.type === ERROR_TYPE) {
      return { error: { type: error.type, message: error.message } }
    }
    return {
      error: { message: 'Ocurrió un error inesperado, inténtelo más tarde.' }
    }
  }
}
export { requestFile, getMimeTypes }
