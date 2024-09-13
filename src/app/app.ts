import path from 'node:path'
import express from 'express'
import cors from 'cors'
import { apiConfig } from '../config/apiConfig'
import { logger } from '../middlewares/logger'
import pdfReaderRouter from '../routes/pdfReaderRouter.routes'

const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(cors(apiConfig.CORS_SETTINGS))
app.use(logger)
const publicFilesPath = path.join(__dirname, '../public')
console.log(publicFilesPath)

app.use('/', express.static(publicFilesPath))
app.use(pdfReaderRouter)
app.use('*', express.static(publicFilesPath))

export default app
