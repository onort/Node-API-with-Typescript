import * as express from 'express'
import movieRoutes from './routes/movies'

let app: express.Application = express()

app.get('/api', (req: express.Request, res: express.Response) => {
  res.json({ message: 'Hello from JSON'})
})

app.use('/api/movies', movieRoutes)

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`))