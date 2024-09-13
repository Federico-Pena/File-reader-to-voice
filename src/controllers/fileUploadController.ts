import { Request, Response } from 'express'
import { ApiError } from '../ApiError/ApiError'
import { apiConfig } from '../config/apiConfig'
import { switchServices } from '../services/switchServices'

const fileUploadController = async (req: Request, res: Response) => {
  try {
    if (req.file === undefined || req.file.buffer === undefined) {
      throw new ApiError('No se pudo leer el archivo.', 400)
    }

    const mimeTypes = Object.values(apiConfig.ACCEPTED_MIME_TYPES).map(
      (type) => type.server
    )

    if (!mimeTypes.includes(req.file.mimetype)) {
      const clientMimeTypes = Object.values(apiConfig.ACCEPTED_MIME_TYPES)
        .map((type) => `"${type.client}"`)
        .join(', ')
      const msg = `Los formatos permitidos son: ${clientMimeTypes}.`
      throw new ApiError(msg, 400)
    }

    const dataBuffer = req.file.buffer
    const textToSend = await switchServices(req.file.mimetype, dataBuffer)

    if (textToSend === undefined || textToSend.length === 0) {
      throw new ApiError('No se pudo extraer el texto del archivo.', 400)
    }

    return res.status(200).json({
      data: textToSend
    })
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        error
      })
    }
    const apiError = new ApiError('Error inesperado intentalo nuevamente.', 500)
    return res.status(apiError.statusCode).json({ error: apiError })
  }
}

export default fileUploadController
