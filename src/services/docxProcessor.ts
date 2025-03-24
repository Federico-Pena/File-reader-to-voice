import mammoth from 'mammoth'
import { ApiError } from '../ApiError/ApiError'

export const docxProcessor = async (docxBuffer: Buffer): Promise<string[]> => {
  try {
    const { value: text } = await mammoth.extractRawText({ buffer: docxBuffer })
    if (text.trim().length === 0) {
      throw new ApiError(
        'El archivo DOCX está vacío o no se pudo extraer el texto.',
        400
      )
    }
    return text.trim().split('\n\n')
  } catch (error: any) {
    console.error('Error procesando DOCX:', error.message)
    throw new ApiError('Error procesando el archivo DOCX.', 500)
  }
}
