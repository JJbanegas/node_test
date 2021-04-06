const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const jwt = require('express-jwt')

const Book = require("./models/bookModel")
const bookRouter = require('./routes/bookRouter')(Book)

const Usser = require("./models/usserModel")
const usserRouter = require("./routes/usserRouter")(Usser)

const app = express()

const  connectDb = async () =>{
  try{
    await mongoose.connect("mongodb://localhost/bookAPI", {useNewUrlParser : true})
  }
  catch(error){
    throw error
  }
}
connectDb()

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.all('/api/*', jwt({secret: 'secret', algorithms: ['HS256']}).unless({path: ['/api/ussers/login']}))
app.use('/api',bookRouter)
app.use('/api',usserRouter)

const port = 8080
app.listen(port, () => {
  console.log(`Server started on port: ${port}`)//eslint-disable-line
})

