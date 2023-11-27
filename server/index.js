// Import packages and files
import express from 'express'
import session from 'express-session'
// // import ViteExpress from 'vite-express' --- THIS  IS FOR FUTURE PROJECTS
import cors from 'cors'
import drinks from './db.json' assert {type: 'json'}
import handlerFunctions from './controller.js'


// Setup my express instance
const app = express()


// Setup Middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.static('client'))
app.use(session({
    secret: 'Thisisasupersecret',
    saveUninitialized: true,
    resave: false
}))


// ROUTES GO HERE

const {sayHello, allCharacters, oneChar, addChar, deleteChar, updateChar} = handlerFunctions

app.get('/hello', sayHello)

app.get('/characters', allCharacters)

app.get('/oneChar/:index', oneChar)

app.post('/character', addChar)

app.delete('/character/:id', deleteChar)

app.put('/character/:id', updateChar)



// Start up server with app.listen
app.listen(8000, () => console.log('Avengers assemble on http://localhost:8000'))

// ViteExpress.listen(app, 8000, () => {
//     console.log('Avengers assemble at http://localhost:8000')
// })