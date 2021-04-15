
//Browser http requests with fetch: grabs info fro preloaded json page
//Now that we've made a search bar and search button for our home page
//in index.hbs, it's time to get the data.
const weatherForm = document.querySelector("form")      //returns a javascript representation of the element
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''


    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) =>{
        if(data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
                
            }
        }
    )
})
})
