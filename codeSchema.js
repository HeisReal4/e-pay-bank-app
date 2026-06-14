import mongoose from "mongoose";

const codeSchema= new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  code:String,
  createdAt:{
    type:Date,
    default: Date.now,
    expires: 60
  }
})

const codeModel= mongoose.model('OtpCode', codeSchema);

export default codeModel;
