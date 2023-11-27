
// Bringing data from an external file called db.json.
// Assert checks that the file passes as json.
// The variable to access this file will be called characters.
import characters from './db.json' assert {type: 'json'}
// Setting up a global variable id to 4 because we will always start out with 3 characters in our object when our server is rendered.
// In our db.json file, each character has an key "id" with a value. 
// The id value starts at 1 and goes to 3
let globalId = 4






// Creating a object by the name of handlerFunctions. 
const handlerFunctions = {
    // Creating an object key that its value is an arrow function. 
    // Our function will take 2 arguments, a request and a response.
    sayHello: (req, res) => {
        res.send('Hello there!')
    },

    allCharacters: (req, res) => {
        res.send(characters)
    },

    oneChar: (req, res) => {

        console.log('the req.params are', req.params)

        res.send(characters[req.params.index])
    },

    addChar: (req, res) => {
        // create an object
        // pass in the values from the request
        // add that object to the drinks array
        console.log(req.body)
        const {charName, charPic, charAge, charCatchphrase} = req.body

        let newObj = {
            id: globalId,
            name: charName,
            age: charAge,
            catchphrase: charCatchphrase,
            picture: charPic,
            votes: 0
        }

        characters.push(newObj)

        globalId++

        res.send(characters)
    },

    deleteChar: (req, res) => {
        // get the id to delete from the user
        // find the drink object with the matching id
        // remove object from array

        for(let i = 0; i < characters.length; i++){
            console.log(characters[i].id)
            if(characters[i].id === +req.params.id){
                characters.splice(i, 1)
                break
            }
        }
        res.send(characters)
    },

    updateChar: (req, res) => {
        const index = characters.findIndex((el) => el.id === +req.params.id)

        const {type} = req.body

        if(type === 'upvote'){
            characters[index].votes++
        }else if(type === 'downvote'){
            characters[index].votes--
        }

        res.send(characters)
    }

}

export default handlerFunctions