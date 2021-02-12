import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { errorHandler, NotFoundError } from '@asaqueue/common'
import { indexOrderRouter } from './routes/index'

const app = express()
app.set('trust proxy', true)
app.use(json())

app.use(indexOrderRouter)

app.all('*', async (req, res, next) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }