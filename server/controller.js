
// Bringing data from an external file called db.json.
// Assert checks that the file passes as json.
// The variable to access this file will be called characters.
import characters from './db.json' assert {type: 'json'}
// Setting up a global variable id to 4 because we will always start out with 3 characters in our object when our server is rendered.
// In our db.json file, each character has an key "id" with a value. 
// The id value starts at 1 and goes to 3
let globalId = 4






// Creating a object by the name of handlerFunctions. 
// We will eventually pass this obeject and its functions to our server.
const handlerFunctions = {
    // Creating an object key that its value is an arrow function. 
    // Our function will take 2 arguments, a request and a response.
    sayHello: (req, res) => {
        // app.get('/hello', sayHello)
        // When the req goes through, 'Hello there!' will show up on the page.
        res.send('Hello there!')
    },
    // Creating an object key that its value is an arrow function. 
    // Our function will take 2 arguments, a request and a response.
    allCharacters: (req, res) => {
        // app.get('/characters', allCharacters)
        // When the req goes through, the page will populate with the characters in our json object.
        res.send(characters)
    },
    // Creating the function for our app.get('/oneChar/:index', oneChar) route.
    // Function takes 2 arguments.
    oneChar: (req, res) => {
        // When the req goes through, the console will display a character index.
        // The page will populate with the single character with that index.
        // Depending on what index you put in, depends on the character output.
        console.log('the req.params are', req.params)
        res.send(characters[req.params.index])
    },
    // Creating a functino for our app.post('/character', addChar) route.
    // Function takes 2 arguments.
    addChar: (req, res) => {
        // create an object
        // pass in the values from the request
        // add that object to the drinks array
        // If the route works in the server, you should get the character object you are trying to add in your console.
        console.log(req.body)
        // Using object destructuring, we get the respected values for our object.
        // Remember, these are the values for the character the user is adding when they hit the submit button.
        // This is why we use axios.
        // The req.body is the object that is passed from the front end from our submit button. 
        const {charName, charPic, charAge, charCatchphrase} = req.body
        // Creating the new character object to add to our character array. 
        // Copying the same object format in our db.json file for easy adding.
        let newObj = {
            id: globalId,
            name: charName,
            age: charAge,
            catchphrase: charCatchphrase,
            picture: charPic,
            votes: 0
        }
        // Pushing our character to our character array.
        characters.push(newObj)
        // updating our global id so that if the user adds another character, they wont have the same id.
        globalId++
        // Sending the updated characters array to our route. 
        // The front end will access this updated array and populate the DOM accordingly.
        res.send(characters)
    },
    // Creating a function for our app.delete('/character/:id', deleteChar) route.
    deleteChar: (req, res) => {
        // get the id to delete from the user
        // find the drink object with the matching id
        // remove object from array
        // Loop through our characters array. 
        for(let i = 0; i < characters.length; i++){
            console.log(characters[i].id)
            // If the id in our req.params matches the id of that character, remove it.
            if(characters[i].id === +req.params.id){
                characters.splice(i, 1)
                break
            }
        }
        // Sending the updated characters array to our route. 
        // The front end will access this updated array and populate the DOM accordingly.
        res.send(characters)
    },
    // Creating a function for our app.put('/character/:id', updateChar) route.
    updateChar: (req, res) => {
        // Here we using a higher order function called findIndex. 
        // findIndex will go through our characters array and select the first character with a matching id to our req.params
        // This value is then assigned to our variable index.
        const index = characters.findIndex((el) => el.id === +req.params.id)
        // We use object destructuring to get the object key and value passed from the front end. 
        const {type} = req.body
        // If the destructured object{type: upvote} is true, then that character vote count goes up.
        if(type === 'upvote'){
            characters[index].votes++
        // If the destructured object{type: downvote} is true, then that character vote count goes down.
        }else if(type === 'downvote'){
            characters[index].votes--
        }
        // Sending the updated characters array to our route. 
        // The front end will access this updated array and populate the DOM accordingly.
        res.send(characters)
    }

}
// exporting our handlerFunction to be used on our server.
export default handlerFunctions