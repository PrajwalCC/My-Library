const express  = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const ejs = require('ejs');
const mongoose = require('mongoose');
require('dotenv').config()
const bodyParser = require('body-parser')


const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb' , extended: false}))


// Routing 
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)


// connecting DB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', ()=> console.log('connected to Mongoose'))

app.listen(process.env.PORT || 3000)