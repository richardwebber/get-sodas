console.log('JS is connected!')

const baseUrl = 'http://localhost:8000'

const charDisplay = document.querySelector('#charDisplay')
const charForm = document.querySelector('form')

const createCharCard = (charObject) => {

    const newCharCard = document.createElement('section')
    newCharCard.className = 'char-card'

    newCharCard.innerHTML = `
        <img src=${charObject.picture} alt='charecter picture'/>
        <p>${charObject.name}</p>
        <p>${charObject.age}</p>
        <p>${charObject.catchphrase}</p>

        <section>
            <button onclick="updateChar(${charObject.id}, 'downvote')">-</button>
            Popularity: ${charObject.votes}
            <button onclick="updateChar(${charObject.id}, 'upvote')">+</button>
        </section>

        <br/>
        <button onclick="deleteChar(${charObject.id})" >Delete Me</button>
        <br/>


    `
    charDisplay.appendChild(newCharCard)
}

const displayAllCharacters = (arr) => {
    for(let i = 0; i < arr.length; i++){
        console.log(arr[i])
        createCharCard(arr[i])
    }
}

const getAllCharacters = () => {
    axios.get('http://localhost:8000/characters')
        .then((response) => {
            console.log(response.data)
            displayAllCharacters(response.data)
        })
        .catch((theseHands) => {
            console.log(theseHands)
        })
}

const handleSubmit = (e) => {
    e.preventDefault()

    charDisplay.innerHTML = ''

    let name = document.querySelector('#charName')
    let charPicture = document.querySelector('#charPicture')
    let charAge = document.querySelector('#charAge')
    let charQuote = document.querySelector('#charQuote')

    let bodyObj = {
        charName: name.value,
        charPic: charPicture.value,
        characterAge: charAge.value,
        characterQuote: charQuote.value
    }

    axios.post(`${baseUrl}/character`, bodyObj)
        .then((response) => {
            console.log(response.data)
            displayAllCharacters(response.data)
        })
        .catch((theseHands) => {
            console.log(theseHands)
        })
}

const deleteChar = (id) => {

    axios.delete(`${baseUrl}/character/${id}`)
        .then((res) => {
            console.log(res.data)
            charDisplay.innerHTML = ''
            displayAllCharacters(res.data)
        })
        .catch((theseHands) => {
            console.log(theseHands)
        })
}


const updateChar = (id, type) => {

    let bodyObj = {
        type: type
    }

    axios.put(`${baseUrl}/character/${id}`, bodyObj)
        .then((res) => {
            console.log(res.data)
            charDisplay.innerHTML = ''
            displayAllCharacters(res.data)
        })
        .catch((theseHands) => {
            console.log(theseHands)
        })
}



charForm.addEventListener('submit', handleSubmit)

getAllCharacters()