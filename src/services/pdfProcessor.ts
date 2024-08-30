import pdfParse from 'pdf-parse'
import { ApiError } from '../ApiError/ApiError'
import Tesseract from 'tesseract.js'
import pdf2img from 'pdf-img-convert'

export const pdfProcessor = async (pdfBuffer: Buffer): Promise<string[]> => {
  const data = await pdfParse(pdfBuffer, {})
  const pdfParseFail = data.text.trim().length !== 0
  if (pdfParseFail) {
    return data.text.trim().split('\n\n')
  }
  const document = await pdf2img.convert(pdfBuffer)
  const textOCR = await extractTextWithOCR(document)
  const pdfOCRTextFail = textOCR === null || textOCR.length === 0
  if (pdfOCRTextFail) {
    throw new ApiError('Error procesando el PDF.', 500)
  }
  return textOCR
}

const extractTextWithOCR = async (images: any): Promise<string[] | null> => {
  try {
    const ocrText = []
    for (let page = 0; page < images.length; page++) {
      const {
        data: { text }
      } = await Tesseract.recognize(images[page], 'spa', {
        cacheMethod: 'tesseract://cache',
        cachePath: 'tesseract://cache'
      })
      if (text.trim().length > 0) {
        ocrText.push(text)
      }
    }
    return ocrText
  } catch (error: any) {
    console.log('OCR error:', error.message)
    return null
  }
}
