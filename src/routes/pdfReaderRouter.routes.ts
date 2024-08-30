import { Router } from 'express'
import { apiConfig } from '../config/apiConfig'
import fileUploadController from '../controllers/fileUploadController'
import { multerMemoryStorage } from '../middlewares/multer'
const pdfReaderRouter = Router()

const { uploadFile, getMimeTypes } = apiConfig.API_ROUTES.uploadFile

pdfReaderRouter.get(getMimeTypes, fileUploadController)
pdfReaderRouter.post(uploadFile, multerMemoryStorage, fileUploadController)

export default pdfReaderRouter
