import path from 'node:path'
import fs from 'node:fs'
import { describe, test, expect } from 'vitest'
import { switchServices } from '../../src/services/switchServices'
import { ApiError } from '../../src/ApiError/ApiError'
import { pdfProcessor } from '../../src/services/pdfProcessor'
import { docxProcessor } from '../../src/services/docxProcessor'
import { txtProcessor } from '../../src/services/txtProcessor'
import { rtfProcessor } from '../../src/services/rtfProcessor'
import { htmlProcessor } from '../../src/services/htmlProcessor'
import { mdProcessor } from '../../src/services/mdProcessor'

const includesText = (arrayText: string[], text: string) => {
  const textContains = arrayText.some((t) => t.includes(text))
  return textContains
}
describe('switchServices', () => {
  const buffer = Buffer.from('dummy content')

  test('should correctly extract text from TXT file', async () => {
    const filePath = path.join(__dirname, '../testFiles/sample.txt')
    const fileBuffer = fs.readFileSync(filePath)
    const extractedText = await txtProcessor(fileBuffer)
    const textContains = includesText(
      extractedText,
      'The names "John Doe" for males, "Jane Doe" or "Jane Roe" for females,'
    )
    expect(textContains).toBe(true)
  })

  test('should correctly extract text from DOCX file', async () => {
    const filePath = path.join(__dirname, '../testFiles/sample.docx')
    const fileBuffer = fs.readFileSync(filePath)
    const extractedText = await docxProcessor(fileBuffer)
    const textContains = includesText(
      extractedText,
      'Vestibulum neque massa, scelerisque sit amet ligula eu, congue molestie mi.'
    )
    expect(textContains).toBe(true)
  })

  test('should correctly extract text from PDF file', async () => {
    const filePath = path.join(__dirname, '../testFiles/sample.pdf')
    const fileBuffer = fs.readFileSync(filePath)
    const extractedText = await pdfProcessor(fileBuffer)
    const textContains = includesText(
      extractedText,
      'Maecenas mauris lectus, lobortis et purus mattis, blandit dictum tellus.'
    )
    expect(textContains).toBe(true)
  })

  test('should correctly extract text from RTF file', async () => {
    const filePath = path.join(__dirname, '../testFiles/sample.rtf')
    const fileBuffer = fs.readFileSync(filePath)
    const extractedText = await rtfProcessor(fileBuffer)

    const textContains = includesText(
      extractedText,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis elit nec ante eleifend,'
    )
    expect(textContains).toBe(true)
  })

  test('should correctly extract text from HTML file', async () => {
    const filePath = path.join(__dirname, '../testFiles/sample.html')
    const fileBuffer = fs.readFileSync(filePath)
    const extractedText = await htmlProcessor(fileBuffer)
    const textContains = includesText(
      extractedText,
      'HOLA, ESTE ES UN ARCHIVO DE PRUEBA HTML'
    )
    expect(textContains).toBe(true)
  })

  test('should correctly extract text from Markdown file', async () => {
    const filePath = path.join(__dirname, '../testFiles/sample.md')
    const fileBuffer = fs.readFileSync(filePath)
    const extractedText = await mdProcessor(fileBuffer)
    const textContains = includesText(extractedText, 'Título de prueba')
    expect(textContains).toBe(true)
  })

  test('should throw ApiError for unsupported file type', async () => {
    const unsupportedMimeType = 'image/png'
    const error = new ApiError('Tipo de archivo no soportado.', 415)
    await expect(
      switchServices(unsupportedMimeType, buffer)
    ).rejects.toMatchObject({ ...error })
  })
})
