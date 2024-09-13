import pdfParse from 'pdf-parse'
import { ApiError } from '../ApiError/ApiError'
import Tesseract from 'tesseract.js'
import { pdfToPng } from 'pdf-to-png-converter'

export const pdfProcessor = async (pdfBuffer: Buffer): Promise<string[]> => {
  try {
    const data = await pdfParse(pdfBuffer, {})
    const pdfParseText = data.text.trim().length !== 0
    if (pdfParseText) {
      return data.text.trim().split('\n\n')
    }
    const images = await pdfToPng(pdfBuffer)

    const textOCR = await extractTextWithOCR(images)
    const pdfOCRTextFail = textOCR === null || textOCR.length === 0
    if (pdfOCRTextFail) {
      throw new ApiError('Error procesando el PDF.', 500)
    }
    return textOCR
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    } else {
      throw new ApiError('Error procesando el PDF.', 500)
    }
  }
}

const extractTextWithOCR = async (images: any): Promise<string[] | null> => {
  try {
    const ocrText = []
    for (let page = 0; page < images.length; page++) {
      const {
        data: { text }
      } = await Tesseract.recognize(images[page].content, 'spa', {
        cacheMethod: 'tesseract://cache',
        cachePath: 'tesseract://cache'
      })
      if (text.trim().length > 0) {
        ocrText.push(text)
      }
    }
    return ocrText
  } catch (error: any) {
    return null
  }
}
