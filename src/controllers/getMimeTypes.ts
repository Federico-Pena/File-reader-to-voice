import { Request, Response } from 'express'
import { apiConfig } from '../config/apiConfig'

const getMimeTypes = async (req: Request, res: Response) => {
  return res.status(200).json({
    data: apiConfig.ACCEPTED_MIME_TYPES
  })
}

export default getMimeTypes
