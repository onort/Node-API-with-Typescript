import { Request as req, Response as res, Router} from 'express'


let router: Router = Router()
let data: Array<any> = require('../../database.json')

router.get('/', (req, res) => {
  res.json({ movies: data })
})

router.get('/:id', (req, res) => {
  let idToFind = Number(req.params.id)
  let movieData = data.filter(movie => movie._id === idToFind)[0]
  if (movieData) res.json({ data: movieData })
  else res.status(404).json({ message: `No movie with the id ${idToFind} can be found`})
})

router.post('/add/:id', (req, res) => {
  let movieToAdd = req.params.id
  console.log(movieToAdd)
  res.json({ id: movieToAdd, message: 'Request recieved'})
})

export default router