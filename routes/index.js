const express = require('express')
const router = express.Router()
ejs = require('ejs');

router.get('/', (req, res)=>{
    res.render('index')
})

module.exports = router