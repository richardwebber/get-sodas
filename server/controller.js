import drinks from './db.json' assert {type: 'json'}

let globalId = 4;

const handlerFunctions = {


    sayHello: (req, res) => {
        res.send('Hello world!')
    },
    
    getDrinks: (req, res) => {
        res.send(drinks)
    },
    
    oneDrink: (req, res) => {
        const { index } = req.params;
        res.send(drinks[index])  
    },

    addDrink: (req, res) => {

    const {drinkName, drinkPic} = req.body;

        let newObj = {
            "id": globalId,
            "name": drinkName,
            "picture": drinkPic,
            "votes": 0
        }

        drinks.push(newObj)
        
        globalId++

        res.send(drinks)
    }, 

    deleteDrink: (req, res) => {
        // get the id to delete from the user
        // find the drink object with the matching id
        // remove object from array
        const {id} = req.params;

        for (let i = 0; i < drinks.length; i++){
            if (drinks[i].id === +id) {
                drinks.splice(i, 1);
                break;
            } 
        }
        res.send(drinks)
    }
}


export default handlerFunctions