import { Request as req, Response as res, Router} from 'express'

let router: Router = Router()
let data: Array<any> = require('../../database.json')

router.get('/', (req, res) => res.status(301).redirect('/api/movies/all'))

router.get('/all', (req, res) => {
  let allMovies = data.map(movie => {
    return { name: movie.name, id: movie._id }
  })
  res.json({ movies: allMovies })
})

router.get('/:id', (req, res) => {
  let idToFind = Number(req.params.id)
  let movieData = data.filter(movie => movie._id === idToFind)[0]
  if (movieData) res.json({ data: movieData })
  else res.status(404).json({ message: `No movie with the id of ${idToFind} can be found`})
})

router.post('/add', (req, res) => {
  let movieToAdd: IMovie = req.body
  let { name, genre, release_date, language, length, box_office } = movieToAdd
  if (name && release_date) {
    console.log(name, genre, release_date, language, length, box_office)
    res.status(201).json({ data: movieToAdd, message: `Movie "${name}" successfully added to our database`})
  } else {
    res.json({ message: 'Movie you want to add should have a name, genre, release_date, language, length and box office data'})
  }
})

// router.delete
// router.put

export default router