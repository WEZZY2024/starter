const express = require('express');
const app = express();
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controller/errorController')

const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter')
app.use(express.json());

app.use(express.static(`${__dirname}/public`))



//ROUTERS : TOURS
app.use('/api/v1/tours',tourRouter)
app.use('/api/v1/users',userRouter)

app.all('*',(req , res ,next) => {

  // const err = new Error(`can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;
  next(new AppError(`can't find ${req.originalUrl} on this server`,404))
})
app.use(globalErrorHandler);

module.exports = app