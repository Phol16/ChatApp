import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { CloudinaryService } from './utils/cloudinaryService.js'

const app = express()


app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));

app.set(CloudinaryService.cloudinaryName, new CloudinaryService(
  process.env.CLOUDNAME,
  process.env.APIKEY,
  process.env.APISECRET
))


export default app