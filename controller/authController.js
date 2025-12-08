
const jwt = require('jsonwebtoken')
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync')

const JWT_SECRET = 'my-name-is-wezzy-ngulube-this-is-my-code';
const JWT_EXPIRES_IN ='90d ';

exports.signup = catchAsync( async(req ,res ,next) => {
    // const newUser = await User.create(req.body);
     const newUser = await User.create({
        name : req.body.name,
        email: req.body.email,
        password:req.body.password,
        passwordConfirm : req.body.passwordConfirm
      });

      const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
      });

    res.status(201).json({
        status : 'success',
        token,
        data : {
            user : newUser
        }
    });
});

exports.login = (req,res,next) => {
    const {email , password } = req.body;

    // 1) check if email and password exist

    // 2) check if user exist && password is correct

    //

}