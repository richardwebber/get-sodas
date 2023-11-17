// This is the backend.
// Import packages and files.
import express from 'express';
import session from 'express-session';
// Import ViteExpress from 'vite-express'  -- this will be used in future projects.
import cors from 'cors';
// This is how you would import a file from your folder.
import handlerFunctions from './controller.js';



// Setup my express instance
const app = express();


// Setup Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('client'))
app.use(session({
    secret: 'shhhhhh',
    saveUninitialized: true,
    resave: false
}))


// ROUTES GO HERE
// app.METHOD(PATH, HANDLER)
const {sayHello, getDrinks, oneDrink, addDrink, deleteDrink} = handlerFunctions

app.get('/hello', sayHello)

app.get('/drinks', getDrinks)

app.get('/oneDrink/:index', oneDrink)

app.post('/drink', addDrink)

app.delete('/drink/:id', deleteDrink)

// Start up server with app.listen
app.listen(8000, () => console.log('Server connected http://localhost:8000'))

//This is how you would do that same thing above using Vite.
// ViteExpress.listen(app, 8000, () => console.log('Server connected') )