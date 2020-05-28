const express = require('express')
require('./db/mongoose')
const carRouter = require('./routers/cars')

const app = express()

app.use(express.json())

const port = process.env.PORT || 3000

app.use(carRouter)


app.listen(port, () => {
    console.log('Server is up on port '+ port )
})