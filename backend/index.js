const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const auhtRouter = require('./routes/auth')
const product = require('./routes/product')
const cart = require('./routes/card')
const orderRoute = require('./routes/order')
const PaymentRoute = require('./routes/payment')
const dotenv = require('dotenv')
const app = express()


dotenv.config()

const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

connectDB()

app.use('/api/auth',auhtRouter)
app.use('/api/product',product)
app.use('/api/cart',cart)
app.use('/api/order',orderRoute)
app.use('/api/payment',PaymentRoute)
app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
