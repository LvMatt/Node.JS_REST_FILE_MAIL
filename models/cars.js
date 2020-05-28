const mongoose = require('mongoose')

const Car = mongoose.model('Car', {
    email: {
        type: String,
    },
    carType: {
        type: String,
      
    },
    carColor: {
        type: String,
    },
    carYear: {
        type: Number,
    },
    carPic:{
        type: String
    }
})

module.exports = Car