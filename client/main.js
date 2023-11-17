// This is the front end that is communicating with our HTML

console.log('JS is connected')


const drinkDisplay = document.querySelector('#drinkDisplay')
const drinkForm = document.querySelector('form')
const baseUrl = 'http://localhost:8000';

const createDrinkCard = (drinkObject) => {
    const newDrinkCard = document.createElement('section')

    newDrinkCard.innerHTML = `
    <img src=${drinkObject.picture} alt='drink picture'/>
    <p>${drinkObject.name}</p>

    <section> 
        <button>-</button>
        Popularity: ${drinkObject.votes}
        <button>+</button>
    </section>

    <br/>
    <br/>

    <button onClick="deleteDrink(${drinkObject.id})" >Delete Me</button>

    <br/>
    <br/>
    `

    drinkDisplay.appendChild(newDrinkCard)
}

const displayAllDrinks = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        createDrinkCard(arr[i])
    }
}

const getAllDrinks = () => {
    axios.get(`${baseUrl}/drinks`)
        .then((response) => {
            console.log(response.data)
            displayAllDrinks(response.data)
        })
        .catch(theseHands => {
            console.log(theseHands)
        })
}

const handleSubmit = (e) => {
    e.preventDefault();

    drinkDisplay.innerHTML = ''

    let name = document.querySelector('#drinkName')
    let drinkPicture = document.querySelector('#drinkPicture')

    let bodyObj = {
        drinkName: name.value,
        drinkPic: drinkPicture.value
    }

    axios.post(`${baseUrl}/drink`, bodyObj)
    .then((response) => {
        console.log(response.data)
        displayAllDrinks(response.data)
    })
    .catch(theseHands => {
        console.log(theseHands)
    })
}

const deleteDrink = (id) => {
    axios.delete(`${baseUrl}/drink/${id}`)
        .then((res) => {
            console.log(res.data)
            drinkDisplay.innerHTML = ''
            displayAllDrinks(res.data)
        })
}



drinkForm.addEventListener('submit', handleSubmit)

getAllDrinks()