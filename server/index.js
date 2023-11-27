// Import packages and files
// SERVER SIDE RENDERING
// 
import express from 'express'
import session from 'express-session'
// // import ViteExpress from 'vite-express' --- THIS  IS FOR FUTURE PROJECTS
import cors from 'cors'
// import characters from './db.json' assert {type: 'json'}
import handlerFunctions from './controller.js'


// Setup my express instance
const app = express()


// Setup Middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.static('client'))
app.use(session({
    secret: 'Shhhhhhhh',
    saveUninitialized: true,
    resave: false
}))


// ROUTES GO HERE
// We are setting up a constant variable using object destructuring.
// The object we are destructuring is our handlerFunctions imported from our file ./controller.js
const {sayHello, allCharacters, oneChar, addChar, deleteChar, updateChar} = handlerFunctions
// Establishing a route for our HTTP GET request with a path to /hello.
// Whene the client makes a GET request to our /hello path, the sayhHello function handles the request.
// The page will display the words 'Hello there!' if this route successfully connects.
app.get('/hello', sayHello)
// Establishing a route for our HTTP GET request with a path to /characters.
// Whene the client makes a GET request to our /characters path, the allCharacters function handles the request.
// The page will display the objects in our db.json files if this route successfully connects.
app.get('/characters', allCharacters)
// Establishing a route for our HTTP GET request with a path to /oneChar/:index.
// When the client makes a GET request to our /oneChar/:index path, the oneChar function handles the request.
// This should show up in your terminal window -> the req.params are { index: '1' },
// if you load this path http://localhost:8000/oneChar/1.
// Depending on what number you put for the index, a different object will be displayed on the page.
// Dont forget we are 0 indexed.
app.get('/oneChar/:index', oneChar)
// When this HTTP POST request path is called, which is called from our front end, 
// it will add a the values put in by the user to the page.
app.post('/character', addChar)
// When this HTTP DELETE request path is called, the deleteChar removes the respected character based on the id selected.
app.delete('/character/:id', deleteChar)
// When this HTTP PUT request path is called, the updateChar changes the respected characters vote based on the id selected.
app.put('/character/:id', updateChar)



// Start up server with app.listen
app.listen(8000, () => console.log('Avengers assemble on http://localhost:8000'))

// ViteExpress.listen(app, 8000, () => {
//     console.log('Avengers assemble at http://localhost:8000')
// })