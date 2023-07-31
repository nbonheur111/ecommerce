//controller is a normal function
import User from "../model/User.js"
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler'

//@desc USER REGISTRATION
//@route POST /api/v1/users/register
//@access Private/Admin -- dev can register an Admin

export const registerUserCtrl = asyncHandler(async(req, res) => {

    const {fullName, email, password} = req.body;

    //check if user already exists
    const userExists = await User.findOne({ email});
    if(userExists){
        throw new Error("User already exists")
    }
    //if not, hash password 
         //salt generate  random string
         //the higher the value the safer, but the slower your app becomes.

    const salt = await bcrypt.genSalt(10) 
    const hashedPassword = await bcrypt.hash(password, salt)


    //register user

    const user = await User.create({
        fullName,
        email,
        password: hashedPassword
    });
    res.status(201).json({
        status: 'success',
        message: "User Registered successfully",
        data: user,
    });
   
});

//desc USER LOGIN
// route: POST api/v1/users/login
//access Public

export const loginUserCtrl = asyncHandler(async(req,res) => {
    const {email, password} = req.body;

    //find user in the database by email
    const userFound = await User.findOne({
        email,
    });
    if(userFound && await bcrypt.compare(password, userFound?.password)){
        res.json({
            status: "Success",
            message: "User logged in successfully",
            userFound
        })

    }else{
        throw new Error('Invalid login credentials')
    }
   
    //use express async handler package to handle errors. Create a middleware to catch errors that might happen
    
})

