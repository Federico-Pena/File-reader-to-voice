import { Router } from 'express'
import { apiConfig } from '../config/apiConfig'
import fileUploadController from '../controllers/fileUploadController'
import { multerMemoryStorage } from '../middlewares/multer'
const pdfReaderRouter = Router()

const { route1 } = apiConfig.API_ROUTES.someRoutes

pdfReaderRouter.post(route1, multerMemoryStorage, fileUploadController)

export default pdfReaderRouter
