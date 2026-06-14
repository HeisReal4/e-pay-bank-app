import mongoose from "mongoose";
import { type } from "os";


const historySchema = new mongoose.Schema({

   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
   },

   recipientName:{
      type:String,
      required:true
   },

   bankName:{
      type:String,
      required:true
   },

   accountNumber:{
      type:String,
      required:true
   },

   amount:{
      type:Number,
      required:true
   },

   status:{
      type:String,
      default:"..Pending"
   },
date:{
   type:Date,
   default:Date.now
}
},{
   timestamps:true
});

const historyModel = mongoose.model(
   "Transaction",
   historySchema
);

export default historyModel;