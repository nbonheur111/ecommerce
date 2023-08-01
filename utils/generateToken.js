
import jwt from 'jsonwebtoken';

//for a token generation we need a payload, or logged in user(use id of the user to generate the token)
//sign prop takes in id of the user, string of characters, and when you want the token to expire


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_KEY,{expiresIn: "1d"})

};
export default generateToken