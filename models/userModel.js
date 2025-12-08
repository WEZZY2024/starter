const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name : { 
        type : String,
         required : [true , 'please tell us your name !']
        },
    email : {
        type : String ,
        required : [true , 'please provide your email'],
        unique : true,
        lowercase : true
    },
    photo : {type : String},
    password : {
        type : String,
        required : [true , 'please provide a password'],
        minLength : 8
    },
    passwordConfirm: {
        type : String,
        required: [true,'Please confirm your password'],
        validate:{
            //This only works on Create and SAVE !!
            validator : function(el){
                return el === this.password
            },
            message : 'passwords are not the same'
        }
    }
});

userSchema.pre('save', async function(next){

    // only run this function if  password was actually modified

    if(!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password,12);

    // Delete passwordConfirm
    this.passwordConfirm = undefined;
    next()
});


const User = mongoose.model('User', userSchema);

module.exports = User
