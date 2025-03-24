import { ApiError } from '../ApiError/ApiError'

export const txtProcessor = async (txtBuffer: Buffer): Promise<string[]> => {
  try {
    const text = txtBuffer.toString('utf-8').trim()
    if (text.length === 0) {
      throw new ApiError(
        'El archivo TXT está vacío o no se pudo extraer el texto.',
        400
      )
    }
    return text.split('\n\n')
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error
    } else {
      throw new ApiError('Error procesando el archivo TXT.', 500)
    }
  }
}
