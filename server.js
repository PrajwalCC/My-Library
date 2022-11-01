const express  = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const ejs = require('ejs');
const indexRouter = require('./routes/index')
const mongoose = require('mongoose');
require('dotenv').config()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.use('/', indexRouter)

// connecting DB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', ()=> console.log('connected to Mongoose'))

app.listen(process.env.PORT || 3000)