import { ApiError } from '../ApiError/ApiError'
import { apiConfig } from '../config/apiConfig'
import { docxProcessor } from './docxProcessor'
import { htmlProcessor } from './htmlProcessor'
import { mdProcessor } from './mdProcessor'
import { pdfProcessor } from './pdfProcessor'
import { rtfProcessor } from './rtfProcessor'
import { txtProcessor } from './txtProcessor'

const switchServices = async (mimetype: string, dataBuffer: Buffer) => {
  let textToSend
  switch (mimetype) {
    case apiConfig.ACCEPTED_MIME_TYPES.pdf.server:
      textToSend = await pdfProcessor(dataBuffer)
      break
    case apiConfig.ACCEPTED_MIME_TYPES.docx.server:
      textToSend = await docxProcessor(dataBuffer)
      break
    case apiConfig.ACCEPTED_MIME_TYPES.txt.server:
      textToSend = await txtProcessor(dataBuffer)
      break
    case apiConfig.ACCEPTED_MIME_TYPES.rtf.server:
      textToSend = await rtfProcessor(dataBuffer)
      break
    case apiConfig.ACCEPTED_MIME_TYPES.html.server:
      textToSend = await htmlProcessor(dataBuffer)
      break
    case apiConfig.ACCEPTED_MIME_TYPES.md.server:
      textToSend = await mdProcessor(dataBuffer)
      break

    default:
      throw new ApiError('Tipo de archivo no soportado.', 415)
  }
  return textToSend
}
export { switchServices }
