import { Request, Response } from 'express'
import { ApiError } from '../ApiError/ApiError'
import { pdfProcessor } from '../services/pdfProcessor'

const fileUploadController = async (req: Request, res: Response) => {
  try {
    if (req.file === undefined || req.file.buffer === undefined) {
      throw new ApiError('No se pudo leer el archivo.', 400)
    }
    let textToSend
    const dataBuffer = req.file.buffer
    switch (req.file.mimetype) {
      case 'application/pdf':
        textToSend = await pdfProcessor(dataBuffer)
        break
      default:
        throw new ApiError('Tipo de archivo no soportado.', 415)
    }

    if (textToSend === undefined || textToSend.length === 0) {
      throw new ApiError('No se pudo extraer el texto del archivo.', 400)
    }
    return res.status(200).json({
      data: textToSend
    })
  } catch (error) {
    console.log(error)
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({ error })
    }
    return res.status(500).json({ error: { message: 'Error inesperado.' } })
  }
}

export default fileUploadController
