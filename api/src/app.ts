import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import { json } from 'body-parser'
import { errorHandler, NotFoundError } from '@asaqueue/common'
import { newTaskRouter, indexTaskRouter } from './routes'

const app = express()

app.use(cors())
app.set('trust proxy', true)
app.use(json())

app.use(newTaskRouter)
app.use(indexTaskRouter)

app.all('*', async (req, res, next) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }