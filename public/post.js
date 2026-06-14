const hold= document.getElementById('holder');
 const navv= document.getElementById('nav');



const toast =
document.getElementById("toast");

function showError(message){

   toast.textContent = message;

   toast.classList.add("show");

   setTimeout(()=>{

      toast.classList.remove("show");

   },2000);

}




const balance=document.getElementById('balance');

async function getdetails(params) {
  try {
    const req= await fetch('/userdetails')
    const res= await req.json()
    const realAmount= res/100;
    balance.innerHTML=`₤${realAmount.toLocaleString(
      undefined, {
        minimumFractionDigits:2,
        maximumFractionDigits:2
      }
    )}`
  } catch (error) {
    
  }
}

getdetails();



function not(){
  showError('no notification yet!')
}




//for adding user information to transfer history after payment.



async function paid() {
  showError('Service not available in current country');
}

function formatTime(date) {

   const now = new Date();

   const past = new Date(date);

   const seconds = Math.floor((now - past) / 1000);

   const minutes = Math.floor(seconds / 60);

   const hours = Math.floor(minutes / 60);

   const days = Math.floor(hours / 24);

   const weeks = Math.floor(days / 7);

   const months = Math.floor(days / 30);

   const years = Math.floor(days / 365);

   if(seconds < 60){
      return "Just now";
   }

   if(minutes < 60){
  if (minutes===1) {
    return `${minutes} minute ago`;
  }else{return `${minutes} minutes ago`;}
   }

   if(hours < 24){
    if (hours===1) {
      return `${hours} hour ago`;
    }else{
      return `${hours} hours ago`;
    }
      
   }

   if(days === 1){
      return "Yesterday";
   }

   if(days < 7){
      if (days===1) {
      return `${days} day ago`;
    }else{
      return `${days} days ago`;
    }
   }

   if(weeks < 5){
      if (weeks===1) {
      return `${weeks} week ago`;
    }else{
      return `${weeks} weeks ago`;
    }
   }

   if(months < 12){
      if (months===1) {
      return `${months} month ago`;
    }else{
      return `${hours} months ago`;
    }
   }

   return `${years} years ago`;

}




function showtr(){
  const transblog = document.getElementById('trrans').classList.add('active');

}

function back(){
  const transblog = document.getElementById('trrans').classList.remove('active');
}













function send(){
  location.assign('/paymentForm')
}



const userName= document.getElementById('userName');
const profilePic= document.getElementById('profilePic');

async function getProfile() {
  try {
    const res = await fetch('/getProfile')

    const result = await res.json()
    if(result.name){
      userName.innerHTML=`Welcome ${result.name} 👋`
    }


if (result) {
   profilePic.src = result.image;
}
profilePic.onerror= function(){
  profilePic.src="./user.png"
}
  
    
  } catch (error) {
    
  }
}

getProfile();







const closee = document.getElementById("close");

const opeen = document.getElementById("open");


// Restore state when page loads
const savedState = localStorage.getItem("balanceState");

if(savedState === "hidden"){
  closee.style.display = "none";
  opeen.style.display = "flex";
}


const eyeBtn=document.getElementById('eyeBtn')

eyeBtn.addEventListener("click", ()=>{

  closee.style.display='none'
  opeen.style.display='flex'

  localStorage.setItem("balanceState", "hidden");

});


const eyebtnn= document.getElementById('eyeBtnn');

eyebtnn.addEventListener('click',()=>{

  closee.style.display='flex'
  opeen.style.display='none'

  localStorage.setItem("balanceState", "visible");

})


const history = document.getElementById("history");

async function getHistory(){

   try{

      const req = await fetch("/transactionHistory");

      const result = await req.json();

      

      result.forEach((item)=>{

         const html = `

         <div class="trx">

            <div class="left">

               <h4>Transfer to ${item.recipientName}</h4>

               <p>${item.bankName} • ****${item.accountNumber.slice(-4)}</p>

               <span>
                  ${formatTime(new Date(item.createdAt))}
               </span>

            </div>

            <div class="right">

               <h3 class="debit">
                  -₤${(item.amount/100).toLocaleString( undefined, {
        minimumFractionDigits:2,
        maximumFractionDigits:2
      })}
               </h3>

               <p class="pending">
                  ${item.status}
               </p>

            </div>

         </div>

         `;
         history.insertAdjacentHTML("afterbegin", html);

      });

   }catch(error){

      console.log(error.message);

   }

}

getHistory();