import { Request, Response } from 'express'
import { apiConfig } from '../config/apiConfig'
import { ApiError } from '../ApiError/ApiError'

const getMimeTypes = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      data: apiConfig.ACCEPTED_MIME_TYPES
    })
  } catch (error) {
    const apiError = new ApiError('Error inesperado intentalo nuevamente.', 500)
    return res.status(apiError.statusCode).json({
      error: apiError
    })
  }
}

export default getMimeTypes
