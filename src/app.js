//Using express to build server applications; get info from user on client side and connect to database

const path = require('path')
const express = require('express')
const hbs = require ('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//express is a fuction as opposed to an object
const app = express()
const port = process.env.PORT || 3000

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
app.set('view engine', 'hbs') //setting dynamic handlebars; has to look EXACTLY like this
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//express.static takes the path to the folder we wanna serve up
//app.use uses the index.html in the public folder we accessed
app.use(express.static(publicDirectoryPath))     
                                                

//Uses handlebars file
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Head'
    })     //handlebars file
})

//Uses handlebars file
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

//The Query String
//Ex: http://localhost:3000/products?search=games&rating=5
//Express translates query string and gives us the values of 'search' and 'rating'
app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

//Uses handlebars file
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'More Help',
        name: 'Alex Park'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error: error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })

        })
    })

    // res.send({
    //     foreacast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Alex Park',
    errorMessage: 'Help article not found'
    })
})

//This 404 error has to go last after ALL app.get functions
//so that the program goes through all the possibilities
app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Alex Park',
        errorMessage: 'Page not found'
    })
})

//get method takes 2 arguments: first, partial url. second, function that dictates what we wanna do when user visits partial url
app.get('', (req, res) => {     //req (requset) contains information about incoming request to the server
                                //res (response) contains a bunch of methods allowing us to customize what we're gonna send back to the user
    res.send('<h1>Home</h1>')
})      //beacuse of the static call to the index.html/index.hbs, it'll always overwrite this .get method. Thus, it serves no point

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Andrew',
//         age: 27
//     }, {
//         name: 'Sarah'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

//app.com
//app.com/help
//app.com/about

app.listen(port, ()=> {
    console.log('Server is up on port 3000')
})          //starts up server at given port. leaving parameter empty designates default port

