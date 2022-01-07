const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, "../public"))
const app = express()
const port = process.env.PORT || 3000

const publicDirectryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectryPath))
app.get("", (req, res) => {
    res.render('index', {
        'title': "weather app",
        'name': "Rishabh Singh"
    })
})
app.get("/about", (req, res) => {
    res.render('about', {
        'title': "About section",
        'name': "Rishabh Singh"
    })
})

app.get("/help", (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Rishabh Singh'
    })
})

app.get("/about", (req, res) => {
    res.send("This is about page")
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        console.log(error)
        console.log(latitude, longitude, location)
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "please enter the search string"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render('404', {
        title: '404',
        name: 'rishabh',
        errorMessage: 'help article not found'
    })
})

app.get("*", (req, res) => {
    res.render('404', {
        title: '404',
        name: 'rishabh',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log("Server is running on port " + port)
})