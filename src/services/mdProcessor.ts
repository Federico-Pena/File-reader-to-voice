import MarkdownIt from 'markdown-it'
import { ApiError } from '../ApiError/ApiError'

export const mdProcessor = async (mdBuffer: Buffer): Promise<string[]> => {
  try {
    const markdown = mdBuffer.toString('utf-8')
    const md = new MarkdownIt()
    const text = md.render(markdown).replace(/<\/?[^>]+(>|$)/g, '') // Remueve etiquetas HTML
    if (text.trim().length === 0) {
      throw new ApiError(
        'El archivo MD está vacío o no se pudo extraer el texto.',
        400
      )
    }
    return text.trim().split('\n\n')
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error
    } else {
      throw new ApiError('Error procesando el archivo MD.', 500)
    }
  }
}
