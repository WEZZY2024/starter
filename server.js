const dotenv = require('dotenv')
dotenv.config('./.env')
const mongoose = require('mongoose')
const app = require('./app')
const localHost = `127.0.0.1`;
const DB = process.env.DATABASE 
mongoose.connect(`mongodb://localhost:27017/natours-test`).then(con => {
    console.log('DB connection successful')
})
app.get('/home',(req,res) =>{
    res.send('hello world this is wezzy ngulube')
});



const PORT = process.env.PORT;
const server = app.listen(PORT,() =>{
    console.log(`your server is running http://${localHost}:${PORT}`)
});

process.on('unhandledRejection', err => {
    console.log(err.name , err.message);
    console.log('UNHANDLER REJECTION shutting down....')
    server.close(() => {
        process.exit(1);
    })
})