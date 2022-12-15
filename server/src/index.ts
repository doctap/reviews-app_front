import express from 'express'
import helmet from 'helmet'
import cors, { CorsOptions } from 'cors'
import dotenv from 'dotenv'
import apiRoutes from '../src/routes/api.routes'

dotenv.config()

const corsOptions: CorsOptions = {
	credentials: true,
	optionsSuccessStatus: 200,
	origin: ['http://localhost:3000'],
	methods: ['GET', 'POST', 'DELETE'],
}

const app = express()

app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())

app.use('/api', apiRoutes)
app.use('*', (req, res) => {
  res.status(400).json({ message: 'Only api endpoint available' })
})

app.use((err, req, res) => {
  console.log(err)
//   const status = err.status || 500
//   const message = err.message || 'Something went wrong. Try again later'
//   res.status(status).json({ message })
})

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Server ready on port ${port} 🚀 `)
})