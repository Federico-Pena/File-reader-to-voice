import { convert } from 'html-to-text'
import { ApiError } from '../ApiError/ApiError'

export const htmlProcessor = async (htmlBuffer: Buffer): Promise<string[]> => {
  try {
    const htmlText = htmlBuffer.toString('utf-8')
    const text = convert(htmlText, { wordwrap: 130 })
    if (text.trim().length === 0) {
      throw new ApiError(
        'El archivo HTML está vacío o no se pudo extraer el texto.',
        400
      )
    }
    return text.trim().split('\n\n')
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error
    } else {
      throw new ApiError('Error procesando el archivo HTML.', 500)
    }
  }
}
