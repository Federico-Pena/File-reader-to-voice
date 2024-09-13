import { Router } from 'express'
import { apiConfig } from '../config/apiConfig'
import fileUploadController from '../controllers/fileUploadController'
import getMimeTypes from '../controllers/getMimeTypes'
import { multerMemoryStorage } from '../middlewares/multer'
const pdfReaderRouter = Router()

const { uploadFile, getMimeTypes: getMimeTypesRoute } =
  apiConfig.API_ROUTES.uploadFile

pdfReaderRouter.get(getMimeTypesRoute, getMimeTypes)
pdfReaderRouter.post(uploadFile, multerMemoryStorage, fileUploadController)

export default pdfReaderRouter
