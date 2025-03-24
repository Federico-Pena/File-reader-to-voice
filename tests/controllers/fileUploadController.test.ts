import fs from 'node:fs'
import path from 'node:path'
import supertest from 'supertest'
import { describe, test, expect, vi } from 'vitest'
import app from '../../src/app/app'
import { apiConfig } from '../../src/config/apiConfig'
import * as switchServices from '../../src/services/switchServices'
const apiUrl = apiConfig.API_ROUTES.uploadFile.uploadFile
const mimeTypes = apiConfig.ACCEPTED_MIME_TYPES

describe('fileUploadController Controller', () => {
  const mockFile = (
    originalname: string,
    mimetype: string,
    buffer: Buffer
  ) => ({
    fieldname: 'file',
    originalname,
    mimetype,
    buffer,
    size: buffer.length,
    encoding: '7bit'
  })

  test('should return 200 for valid file', async () => {
    const filePath = path.join(__dirname, '../testFiles/sample.txt')
    const fileBuffer = fs.readFileSync(filePath)

    const { statusCode, body } = await supertest(app)
      .post(apiUrl)
      .attach('file', fileBuffer, 'sample.txt')
      .set('Content-Type', 'multipart/form-data')
      .expect(200)

    expect(statusCode).toBe(200)
    expect(body).toHaveProperty('data')
    const textContains = body.data.some((text: string) =>
      text.includes('Example content:')
    )
    expect(textContains).toBe(true)
  })

  test('should return 400 if no file is uploaded', async () => {
    const { statusCode, body } = await supertest(app).post(apiUrl).expect(400)
    expect(statusCode).toBe(400)
    expect(body.error.message).toBe('No se pudo leer el archivo.')
    expect(body.error.statusCode).toBe(400)
    expect(body.error.type).toBe('ApiError')
  })

  test('should return 400 for unsupported file type', async () => {
    const file = mockFile(
      'testfile.png',
      'image/png',
      Buffer.from('dummy content')
    )
    const { statusCode, body } = await supertest(app)
      .post(apiUrl)
      .attach('file', file.buffer, file.originalname)
      .expect(400)

    expect(statusCode).toBe(400)
    expect(body.error.statusCode).toBe(400)
    expect(body.error.type).toBe('ApiError')
    const clientMimeTypes = Object.values(mimeTypes)
      .map((type) => `"${type.client}"`)
      .join(', ')
    const msg = `Los formatos permitidos son: ${clientMimeTypes}.`
    expect(body.error.message).toBe(msg)
  })

  test('should handle unespected errors', async () => {
    const file = mockFile(
      'testFile.txt',
      mimeTypes.txt.server,
      Buffer.from('PDF content')
    )
    vi.spyOn(switchServices, 'switchServices').mockImplementation(() => {
      throw new Error('Unexpected error')
    })
    const { statusCode, body } = await supertest(app)
      .post(apiUrl)
      .attach('file', file.buffer, file.originalname)
      .set('Content-Type', 'multipart/form-data')
      .expect(500)

    expect(statusCode).toBe(500)
    expect(body.error.statusCode).toBe(500)
    expect(body.error.type).toBe('ApiError')
    expect(body.error.message).toBe('Error inesperado intentalo nuevamente.')
  })
})
