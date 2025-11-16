const fs = require('fs');
const Tour = require('./../../models/tourModels')
const mongoose = require('mongoose')



mongoose.connect(`mongodb://localhost:27017/natours-test`).then(con => {
    console.log('DB connection successful')
})
// READ JSON FILE

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));

//IMPORT DATA INTO THE DATABASE

const importData = async () => {
    try {
       await Tour.create(tours);
       console.log('Data successfully loaded')
       
    } catch (error) {
        console.log(error) 
    }
    process.exit()
}

// DELETE ALL DATA FROM COLLECTION

const deleteData = async () => {
    try {
        await Tour.deleteMany()
        console.log('Data successfully deleted')
    } catch (error) {
        console.log(error)
    }
    process.exit();
}
 if (process.argv[2]==='--import'){
    importData()
 } else if(process.argv[2]=== '--delete'){
    deleteData()
 }
