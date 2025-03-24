import app from './app/app'
import { apiConfig } from './config/apiConfig'

app.listen(apiConfig.PORT, () => {
  const text = `Server running in: ${apiConfig.API_URL}`
  console.log(text)
})
