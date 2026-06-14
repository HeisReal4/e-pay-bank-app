import mongoose from 'mongoose';
const mogourl = process.env.MONGO_URL;



async function connectDB() {
  try {
    await mongoose.connect(mogourl);
    console.log('mongodb connected')
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
  
}

export default connectDB;