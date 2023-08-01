//controller is a normal function
import User from "../model/User.js"
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler'
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";



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
            userFound,
            //as soon as the user is logged in then generate the token with JWT using the id
            token: generateToken(userFound?._id)
            
        })

    }else{
        throw new Error('Invalid login credentials')
    }
   
    //use express async handler package to handle errors. Create a middleware to catch errors that might happen
    
})


//@desc Get user profile
//@route GET /api/v1/users/profile
//@access Private

export const getUserProfileCtrl = asyncHandler(async(req, res) => {
    console.log(req.headers)
    //get token from header
    // const token =  req?.headers?.authorization?.split(" ")[1];

    //verify token
    
    const token = getTokenFromHeader(req);
    const verifiedToken = verifyToken(token);

    // console.log(token);
    // console.log(verifiedToken)
    console.log(req)

    res.json({
        msg: "Welcome to profile page"
    })
})


