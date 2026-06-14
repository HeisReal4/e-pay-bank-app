import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true
  },
  balance:{
   type: Number,
   default: 0
  },
  profilePicture:{
    type:String,
    default:""
  },
  isVerified:{
    type:Boolean,
    default: false
  },
  isAdmin:{
    type:Boolean,
    default:false
  }
})

userSchema.pre('save', async function () {
const salt = await bcrypt.genSalt();
this.password= await bcrypt.hash(this.password, salt);
})

userSchema.statics.login= async function(email, password) {
  const user= await this.findOne({email});
  if(user){
    const auth = await bcrypt.compare(password, user.password);
    if (auth){
      return user;
    }
    throw Error('incorrect password')
  }
  throw Error('email does not exist')
} 

const userModel= mongoose.model("users", userSchema);

export default userModel;