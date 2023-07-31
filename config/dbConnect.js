//connect to mongodb


import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        mongoose.set('strictQuery', false);
        const connected = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to mongodb... ${connected.connection.host}`);
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1)
        
    }
}
export default dbConnect;
