import mongoose from "mongoose";

const connectDb = async () =>{
  try {
    const conn = await   mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`) 
    conn.connection.host;
    console.log(`MongoDb connected: ${conn.connection.host}`)
  } catch (error) {
    console.log('mongoose connection err:',error)
  }
}

export default connectDb;