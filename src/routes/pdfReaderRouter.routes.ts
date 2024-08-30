import { Router } from 'express'
import { apiConfig } from '../config/apiConfig'
import fileUploadController from '../controllers/fileUploadController'
import { multerMemoryStorage } from '../middlewares/multer'
const pdfReaderRouter = Router()

const { uploadFile } = apiConfig.API_ROUTES.uploadFile

pdfReaderRouter.post(uploadFile, multerMemoryStorage, fileUploadController)

export default pdfReaderRouter
