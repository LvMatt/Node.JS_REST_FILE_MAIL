const express = require('express')
const app = express();
const Car = require('../models/cars')
const multer = require('multer')
const router = new express.Router()
const { sendWelcomeEmail} = require('../utilities/emails')
const fileupload = require('express-fileupload')
app.use(fileupload());



router.post('/cars', async (req, res) => {
    const car = new Car(req.body)
   
    try {
        await car.save()
        sendWelcomeEmail(car.email, car.carType, car.carColor, car.carYear)
        res.status(201).send(car)
        console.log(req.body);
    } catch (e) {
        res.status(400).send(e)
    }
});

router.get('/cars', async (req, res) => {
    try {
        const cars = await Car.find({})
        res.send(cars)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/cars/:id',  async (req, res) => {
    try {
        const car = await Car.findOneAndDelete({ _id: req.params.id})
        if (!car) {
            res.status(404).send()
        }
        res.send(car)
    } catch (e) {
        res.status(500).send()
    }
})


router.patch('/cars/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['email', 'carType', 'carColor', 'carYear']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) 
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const car = await Car.findOne({ _id: req.params.id})
        if (!car) {
            return res.status(404).send()
        }
        updates.forEach((update) => car[update] = req.body[update])
        await car.save()
        res.send(car)
    } catch (e) {
        res.status(400).send(e)
    }
})


const upload = multer({
    dest: 'src/images',
    limits: {
        fileSize: 2000000
    }
})

router.post('/cars/upload', upload.single('carPic'), (req, res) =>{
    res.send()
})



module.exports = router