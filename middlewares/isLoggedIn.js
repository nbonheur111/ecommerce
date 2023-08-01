import { getTokenFromHeader } from "../utils/getTokenFromHeader.js"
import { verifyToken } from "../utils/verifyToken.js";

export const isLoggedIn = (req, res, next) =>{

    //get token from header
    const token = getTokenFromHeader(req);
    //verify the token
    const decodedUser = verifyToken(token);
    //save the user inot request object
    if(!decodedUser){
        throw new Error("Invalid/Expired token, please login");
    }else {
        //save the user into req obj
        // with object you can create a new property for the userid: userAuthId 
        req.userAuthId = decodedUser?.id;
        next();

        //with the id we can check with mongo who is logged in
    }
    
    





}