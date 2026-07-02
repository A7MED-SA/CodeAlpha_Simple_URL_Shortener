import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import routes from './routes/index.js'
import { redirectToUrl } from './controllers/urlController.js'
import { errorHandler } from './middleware/errorHandler.js'
import { HTTP_STATUS } from './utils/constants.js'
import type { ApiResponse } from './utils/apiResponse.js'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.use(routes)

app.use(express.static('src/public'))

app.get('/:code', redirectToUrl)

app.use((_req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: 'Route not found',
  } satisfies ApiResponse)
})

app.use(errorHandler)

export default app
