const fs = require('fs');
const express = require('express');
const app = express();

const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter')
app.use(express.json)

app.use(express.static(`${__dirname}/public`))


app.use((req,res,next) => {
   console.log('Hello from the middleware');
   next();
})
//ROUTERS : TOURS
app.use('/api/v1/tours',tourRouter)
app.use('/api/v1/users',userRouter)

module.exports = app