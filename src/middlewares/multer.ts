import multer, { memoryStorage } from 'multer'

const newMemoryStorage = memoryStorage()

export const multerMemoryStorage = multer({
  storage: newMemoryStorage
}).single('file')
