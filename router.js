import { Router } from "express";
import sendEmail from "./verifyemail.js";
import historyModel from "./historySchema.js";
import userModel from "./userSchema.js";
import codeModel from "./codeSchema.js";
import cookieParser from 'cookie-parser';
import jsonWebtoken from "jsonwebtoken";
import upload from "./multer.js";
import cloudinary from "./cloudinary.js";
const router= Router()
import path from 'path';
import {fileURLToPath} from 'url';
import {auth, identifier, verifiedUser, Admin} from './middleware.js'
import { assert } from "console";
const file= fileURLToPath(import.meta.url)
const dir= path.dirname(file)
const secret = process.env.MYSECRET;




router.get('/', (req, res)=>{
  res.sendFile(path.join(dir, 'public', 'index.html')); 
  res.send(console.log('i am so confused')) 
})

const maxAge= 1*24*60*60;

function createToken(id){
 return jsonWebtoken.sign({id}, secret, {expiresIn: maxAge});
}

router.get('/signup.html', (req, res)=>{
res.sendFile(path.join(dir, 'public', 'signup.html'))
})




router.post('/addUser', async (req, res)=>{
  const code= Math.floor(100000+Math.random()*900000).toString();
const {firstName, Userlast, email, UserPass}= req.body;
try {
  const emailExist = await userModel.findOne({email});

if (!emailExist) {
  const newUser = await codeModel.create({
    name:firstName, 
    email:email,
    password: UserPass,
    code: code
  })

const send = await  sendEmail(email, code);
if (send) {
  console.log(send.message); 
  res.json('sent')
/* if (send.message ==='email has been sent') {
    res.json('sent');
  }else{ console.log(send.message) }*/
  
}else{  console.log('email already exist') }

}
 
} catch (error) {
  console.log(error.message);
}

})






router.post('/login', async (req, res)=>{
  const code= Math.floor(100000+Math.random()*900000).toString();
try {
   const{email, password}= req.body;
const userData= await userModel.login(email, password);
if(userData){

  
     const token= createToken(userData._id);
  res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge*1000})

 const newUser = await codeModel.create({
    name:userData.name, 
    email:userData.email,
    password: userData.password,
    code: code
  })


  
const send = await  sendEmail(email, code);
if (send) {
  console.log(send.message); 
  res.json('sent')
/* if (send.message ==='email has been sent') {
    res.json('sent');
  }else{ console.log(send.message) }*/

  
}else{  console.log('email already exist') }
  res.json('veryfying')
}

} catch (error) { 
  console.log(error.message)
}
})


router.get('/admin', auth, async (req, res)=>{
  res.sendFile(path.join(dir, 'public', 'admin.html')); 
}) 




router.get('/posts', auth, Admin, async (req, res)=>{
  res.sendFile(path.join(dir, 'public', 'post.html'));
}) 




router.get('/email-otp', verifiedUser, (req, res)=>{
  res.sendFile(path.join(dir, 'public', 'email.html'))
})


router.post('/verifyemail', async (req, res)=>{
  const {code}=req.body;
  const id=req.userid;
  try{
  const user= await userModel.findById(id);
  if (user) {
    const validated = await codeModel.findOne({code:code})
    if (validated) {

      if (user.isAdmin) 
        { res.json({admin:true})}
    else{res.json({admin:false})}
    }


    await validated.deleteOne({_id: validated._id});
  }else{
  
      
const validated = await codeModel.findOne({code:code})

if (validated) {
  const newUser = await userModel.create({
    name:validated.name, 
    email:validated.email,
    password: validated.password,
    isVerified: true
  })


await validated.deleteOne({_id: validated._id});

const token = createToken(newUser._id);
  res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
  if (userData.isAdmin) {
    res.json({admin:true}) 
  }else{res.json({admin:false})}
}else{
  throw new Error('email incorrect or expired')
}
  }

  } catch (error) {
    console.log(error.message);
    res.json(error.message)
  }

})






router.get('/userdetails', auth, async (req, res)=>{
    const userinfo= await userModel.findOne({_id:req.userid})
  if(userinfo){
    res.json(userinfo.balance)
  }
} )

router.post('/history', auth, async (req, res)=>{
  const {recipientName, accountNumber, bankName, amount}=req.body; 
  const newAmt= Number(amount)*100
 
  let userbal= await userModel.findById({_id:req.userid});
  if (userbal.balance < newAmt) {
   return   res.json('insuficient funds')
  }else{

  const newBal= userbal.balance - newAmt; 
  const updtBal= await userModel.findOneAndUpdate({_id:req.userid}, {balance:newBal})

   const addhist= await historyModel.create({
    user: req.userid,
    recipientName: recipientName,
    bankName: bankName,
    accountNumber: accountNumber,
    amount: newAmt,
    date: Date.now()
  }) 

  if(addhist){
    res.json('history added');
  }   }
})



router.get('/transactionHistory',auth, async (req, res)=>{

  const hist= await historyModel.find({user:req.userid}) 

if(hist){
  res.json(hist) 
}
})


router.get('/paymentForm', auth, (req,res)=>{
  res.sendFile(path.join(dir, 'public', 'payment.html'));
})


router.post('/addFunds', async (req, res)=>{
const {email, amount}=req.body;
const realAmount = Math.round(amount*100)
console.log(realAmount);
const userData= await userModel.findOneAndUpdate({email: email},{ $inc: {balance: realAmount}} );
if(!userData){
  res.json('user not found')
}
}) 


router.post('/addImage', auth, upload.single("image"), async (req, res)=>{

  try {

    const {email}=req.body;
const user= await userModel.findOne({email:email})
if(!user){
  console.log('user not found to upload profile')
}else{
  const result= await cloudinary.uploader.upload(req.file.path)
  const addImage= await userModel.findOneAndUpdate({email:email}, {profilePicture:result.secure_url})

  res.json({message:'profile updated',
    image:result.secure_url
  })
}
    
  } catch (error) {
    console.log(error.message)
  }


})


router.get('/getProfile', auth, async (req, res)=>{
  try {
    const id= req.userid
    const user = await userModel.findById(id)

    if (user) {
      res.json({image:user.profilePicture,
        name:user.name
      })
    }else{
      console.log('error finding profile pic in database')
    }


  } catch (error) {
    console.log(error.message)
  }
})


router.get('/transactionHistory', auth, async(req,res)=>{

   try{

      const transactions = await historyModel.find({userId:req.userid})
      .sort({createdAt:-1});
      res.json(transactions);

   }catch(error){

      console.log(error.message);

   }

});

export default router; 