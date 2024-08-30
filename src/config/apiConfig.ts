const API_URL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:${process.env.PORT ?? 1234}`
    : '/'

const CORS_SETTINGS = {
  origin: [
    'http://localhost:1234',
    'http://localhost:5173',
    'https://lector-de-archivos.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
  // maxAge: 3600
  // credentials: true,
  // optionsSuccessStatus: 200,
  // preflightContinue: true,
}
const API_ROUTES = {
  uploadFile: {
    uploadFile: '/api/v1/upload-file'
  }
}
export const apiConfig = {
  API_URL,
  PORT: process.env.PORT ?? 1234,
  API_ROUTES,
  CORS_SETTINGS
}
