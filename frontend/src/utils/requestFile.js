const ERROR_TYPE = 'ApiError'
const URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:1234/api/v1/upload-file'
    : 'https://lector-de-archivos.vercel.app/api/v1/upload-file'

export const requestFile = async (file) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch(URL, {
      body: formData,
      method: 'POST'
    })

    if (!response.ok) {
      return { error: { message: 'Ocurrió un error al enviar el archivo' } }
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
