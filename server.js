import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import connectDB from './db.js';
import router from './router.js';
import {auth, identifier} from './middleware.js'
const port = process.env.PORT||3000;
import cookieParser from 'cookie-parser'; 
const app = express();
app.use(express.json());
app.use(cookieParser()) 
app.use(identifier);
import path from 'path';    
import {fileURLToPath} from 'url';
const file= fileURLToPath(import.meta.url)
const dir= path.dirname(file)
app.use(express.static(path.join(dir, 'public'))) 
app.use(router)    
  
 
 
   
  
async function startDB() {
  await connectDB();
app.listen(port, ()=>console.log(`the server is running on port ${port}`));
} 
  
startDB(); 