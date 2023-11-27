import characters from './db.json' assert {type: 'json'}

let globalId = 4

const handlerFunctions = {

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
        const {charName, charPic} = req.body

        let newObj = {
            id: globalId,
            name: charName,
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