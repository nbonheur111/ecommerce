
import jwt from "jsonwebtoken";
//use jwt to verify the token that came in the header
//the function will be used in the controller as it is what we want to verify


export const verifyToken = (token) => {
    // return true if the token is valid, false if not
    //verify method(token, key used to sign the token, callback function - decoded is the user used to sign the token)

    return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if(err){
            return false;
        }else {
            return decoded;
        }

    })

}
