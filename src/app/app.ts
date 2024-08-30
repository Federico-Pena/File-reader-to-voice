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

app.use('/', express.static(path.resolve('./public')))
app.use(pdfReaderRouter)
app.use('*', (req, res) => {
  return res.status(404).sendFile(path.resolve('./public/404.html'))
})

export default app
