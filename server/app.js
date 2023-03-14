import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

const app = express()


app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));


export default app