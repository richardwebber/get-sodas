// Testing to make sure that our js is connecting to our DOM. 
// If all works, you whould see "JS is connected!" in your console.
console.log('JS is connected!')
// Declaring a variable for our baseurl.
// This will be the base URL for our backend server.
// The variable will be important when we need to update our server address.
const baseUrl = 'http://localhost:8000'

// Setting up a variable for our respected HTML elements.
// We are using the DOM method document.querySelector to select the id of #charDisplay and a form element on our HTML.
// We will be using these variables to make updates and changes our DOM.
const charDisplay = document.querySelector('#charDisplay')
const charForm = document.querySelector('form')


// Here we are create the function that will be called in our displayAllCharecters function.
// Notice our function will take on a charecter object.
const createCharCard = (charObject) => { 

    // Here we are using the document method to create a new section element. 
    // We create a variable for this to make it easier to use later in our code.
    // Last thing we do is we assign a class name of 'char-card' to our new made section.
    // We will use this class name to add some CSS style to our page.
    const newCharCard = document.createElement('section')
    newCharCard.className = 'char-card'

    // This will be the template for our db.json object to be displayed.
    // We go into the newCharCard section we created and add the innerHTML below.
    // The charObject will represent an object that will be passed in as an argument to our function.
    // Becuase we know what object we will be getting, we can specify what property we want to get the value for.
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
    // This line of code is going into our document.querySelector('#charDisplay') and populating the page one object at a time.
    // Computers are fast so it looks like it happens instantly.
    charDisplay.appendChild(newCharCard)
}
// Creating a funciton that we will use in our GET, POST, DELETE and PUT.
// This functino will loop through an array of objects.
const displayAllCharacters = (arr) => {
    // for loop
    for(let i = 0; i < arr.length; i++){
        // With each iteration of the for loop, the console will log the object at each index and
        // it will create a character with the respected values found in the object passed in.
        // Each iteration of the for loop, the character object and its values is injected into the HTML created in our createCharCard function.
        console.log(arr[i])
        createCharCard(arr[i])
    }
}
// This is how we are getting all our objects from our server. 
// Declaring a variable name getAllCharacters for an arrow function. The function takes no arguments.
const getAllCharacters = () => {
    // Using the axios method from the Axios library to do a HTTP GET request from our express server.
    axios.get('http://localhost:8000/characters')
        // This is the promise callback that gets executed if the GET request is successful.
        // If the server responds, the code below will execute.
        .then((response) => {
            // When the page loads, you will have Array(3) [ {…}, {…}, {…} ] consoled to your log.
            // The displayAllCharacters function will console.log the array of obects from first to last in order.
            // The response.data is the data that is sent from your server. 
            // This specific data is from our db.json or in other words, our character object.
            console.log(response.data)
            displayAllCharacters(response.data)
        })
        // This is the promise callback that gets executed if the GET request is not successful.
        // You should see 'thesehands' in your console if this happens.
        .catch((theseHands) => {
            console.log(theseHands)
        })
}
// Here we create our function to handle the data when the user hits the submit button on our page.
// We will be passing this function in as an argument to an event handler.
const handleSubmit = (e) => {
    // The only reason we had this function take an argument is to prevent the page from relaoding.
    // e just represents the event on the event handler.
    e.preventDefault()
    // We select the variable charDisplay and change the innerHTML to an empty string.
    // Remember -- const charDisplay = document.querySelector('#charDisplay') --
    charDisplay.innerHTML = ''
    // Go into our HTML form elements with the respected id's and set the value to our declared variables.
    // We will use these variables to add value to our new character object we will create.
    let name = document.querySelector('#charName')
    let charPicture = document.querySelector('#charPicture')
    let charAge = document.querySelector('#charAge')
    let charQuote = document.querySelector('#charQuote')
    // Creating our new character object
    // Now that we have the values the user put in for the new character they want to add, 
    // we can assign the proper key value pairs of our object.
    // Because we know the index of each object and we know that the vote will always start at 0, 
    // We do not need to add those keys and values to the object at this time. 
    let bodyObj = {
        charName: name.value,
        charPic: charPicture.value,
        characterAge: charAge.value,
        characterQuote: charQuote.value
    }
    // Using axios to do a HTTP POST request to our express server.
    // We are using our variable baseUrl for convienence. This POST request will take our new bodyObj as its argument.
    // The POST method will update the server with the new data provided and update the page. 
    axios.post(`${baseUrl}/character`, bodyObj)
        // This is the promise callback that gets executed if the GET request is successful.
        // If the server responds, the code below will execute.
        .then((response) => {
            // This is the exact same code in our getAllCharacters function.
            // Because we cleared all the inner.HTML earlier in our function, we can now repopulate the page with the updated character.
            // Remember our displayAllCharacters function populates the page one character at a time with HTML sections.
            console.log(response.data)
            displayAllCharacters(response.data)
        })
        // This is the promise callback that gets executed if the POST request is not successful.
        // You should see 'thesehands' in your console if this happens.
        .catch((theseHands) => {
            console.log(theseHands)
        })
}
// This function will be used to delete a character with a specific id.
// This function will be used in our HTML script to remove characters from our DOM and our server.
// <button onclick="deleteChar(${charObject.id})" >Delete Me</button>
const deleteChar = (id) => {
    // Here we are deleting the character for a specific character id. 
    // Each button has the same id as its character counterpart.
    // Depending on which character button you hit 'Delete', that character will be deleted from our server.
    axios.delete(`${baseUrl}/character/${id}`)
        // This is the promise callback that gets executed if the DELETE request is successful.
        // If the server responds, the code below will execute.
        .then((res) => {
            // console.logs the updated array of objects.
            // wipes the pages inner HTML section to later repopulate the page with updated characters from the server.
            // displayAllCharacters repopulates the HTML sections with the deleted character removed.
            console.log(res.data)
            charDisplay.innerHTML = ''
            displayAllCharacters(res.data)
        })
        // This is the promise callback that gets executed if the DELETE request is not successful.
        // You should see 'thesehands' in your console if this happens.
        .catch((theseHands) => {
            console.log(theseHands)
        })
}

// This code defines a function named updateChar that uses Axios
// to make an HTTP PUT request to update a character with a specified ID. 
// Everytime the user clicks '+' or '-' on the character they want, vote changes.
// <button onclick="updateChar(${charObject.id}, 'downvote')">-</button>
// <button onclick="updateChar(${charObject.id}, 'upvote')">+</button>
// These are the respected buttons. 
const updateChar = (id, type) => {
    // Creating an object that will get the value of either 'upVote' or 'downVote'
    // upVote and downVote are not defined but we can assume that when the user clicks on either button, it will change the vote. 
    let bodyObj = {
        type: type
    }
    // This line makes an HTTP PUT request using Axios.
    // ${baseUrl}/character/${id} constructs the URL for the PUT request.
    // The id parameter is appended to this URL to specify the character to update.
    // bodyObj is passed as the data to be sent in the request body.
    axios.put(`${baseUrl}/character/${id}`, bodyObj)
        // This is the promise callback that gets executed if the PUT request is successful.
        // If the server responds, the code below will execute.
        .then((res) => {
            // Console.logs the updated array of objects.
            // Wipes the pages inner HTML section to later repopulate the page with updated characters from the server.
            // DisplayAllCharacters repopulates the HTML sections with the deleted character removed.
            console.log(res.data)
            charDisplay.innerHTML = ''
            displayAllCharacters(res.data)
        })
        // This is the promise callback that gets executed if the PUT request is not successful.
        // You should see 'thesehands' in your console if this happens.
        .catch((theseHands) => {
            console.log(theseHands)
        })
}


// Selecting the form element in our HTML and attaching an event handler to it.
// When the form is submited, the handleSubmit function will be called.
charForm.addEventListener('submit', handleSubmit)
// Initially calling our getAllCharacters function to populate our page with the characters from our server.
getAllCharacters()