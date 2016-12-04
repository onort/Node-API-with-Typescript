import * as express from 'express'
import * as logger from 'morgan'
import * as bodyParser from 'body-parser'
import movieRoutes from './routes/movies'

let app: express.Application = express()

app.set('port', (process.env.PORT || 3000));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))

// Routes
app.use('/api/movies', movieRoutes)

app.get('/api', (req: express.Request, res: express.Response) => {
  res.json({ message: 'Hello from JSON'})
})

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`))