import jsonWebtoken from 'jsonwebtoken';
import userModel from './userSchema.js';
import cookieParser from 'cookie-parser';
const secret = process.env.MYSECRET;

const auth = (req, res, next)=>{

const token = req.cookies.jwt;
if (token) {
  jsonWebtoken.verify(token, secret, (err, decodedToken)=>{
    if (err) {
      console.log(err.message);
      res.redirect('/')
    }else{
next()
    }
  } )
}else{
  res.redirect('/');
}
}



const identifier = (req, res, next)=>{
const token = req.cookies.jwt;
if (token) {
  jsonWebtoken.verify(token, secret, (err, decodedToken)=>{
    if (err) {
      next()
    }else{
req.userid=decodedToken.id;
next()
    }
  } )
}else{
  next()
}
}

const verifiedUser= async (req, res, next)=>{
  const id= req.userid;
  try {
    const data= await userModel.findById(id);
      console.log(data);
if (data) {
  if (data.isVerified){
  res.redirect('/posts');
}
}else{
  next()
}

  } catch (error) {
    console.log(error.message);
  }

}

const Admin = async(req, res, next)=>{
const id= req.userid
const data= await userModel.findById(id);

if(data.isAdmin){
  res.redirect('/admin')
}else{
  next()
}
}


export {auth, identifier, verifiedUser, Admin}; 