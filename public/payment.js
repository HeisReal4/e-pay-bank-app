
    const transferForm = document.getElementById('transferForm');
  const bck= document.getElementById('bck');

  const hi= document.getElementById('hi');

    const pinModal = document.getElementById('pinModal');

    const confirmBtn = document.getElementById('confirmBtn');

    const successBox = document.getElementById('successBox');

    const transferPage = document.getElementById('transferPage');

    const pinInputs = document.querySelectorAll('.pin-inputs input');

    const pii= document.getElementById('pii');






const toast =
document.getElementById("toast");

function showError(message){

   toast.textContent = message;

   toast.classList.add("show");

   setTimeout(()=>{

      toast.classList.remove("show");

   },2000);

}




    transferForm.addEventListener('submit', function(event){

      event.preventDefault();

      pinModal.style.display = 'flex';

    });

    function bb(){
      pinModal.style.display = 'none';
     hi.innerHTML=''
     pii.innerHTML=''
      pinInputs.forEach((input)=>{
         input.value='';
      })

    }


    pinInputs.forEach((input, index) => {

      input.addEventListener('input', () => {
         hi.innerHTML=''
       pii.innerHTML='';
        if(input.value.length === 1 && index < pinInputs.length - 1){

          pinInputs[index + 1].focus();

        }

      });

    });


    pinInputs.forEach((input, index)=>{
  input.addEventListener("keydown", (e)=>{
   hi.innerHTML=''
   pii.innerHTML=''
if (e.key==='Backspace' && input.value==='' && index > 0) {
  pinInputs[index - 1].focus()
}
})
})

   
    function goback(){
      location.assign('/posts')
    }













    const fullnameEl =
document.getElementById("fullname");

const accountNumberEl =
document.getElementById("accountNumber");

const bankNameEl =
document.getElementById("bankName");

const amountEl =
document.getElementById("amount");

//const sendBtn =document.getElementById("sendBtn");

function carrytr (){


   const transferData = {

      recipientName:
      fullnameEl.value,

      accountNumber:
      accountNumberEl.value,

      bankName:
      bankNameEl.value,

      amount:
      Number(amountEl.value)

   };

localStorage.setItem(
   "pendingTransfer",
   JSON.stringify(transferData)
);

console.log(transferData);

}
 




function getPin(){

   return Array.from(pinInputs)
   .map(input => input.value)
   .join("");

}




const con =document.getElementById("confirmBtn");


async function confirmTransfer(){

  const pin = getPin();

  if (pin.length < 4) { 
   pii.innerHTML='incomplete pin'
  }else{

   if(pin === '1339'){

      const transferData =
      JSON.parse(
         localStorage.getItem(
            "pendingTransfer"
         )
      );

      const req = await fetch(
         "/history",
         {
            method:"POST",

            headers:{
               "Content-Type":
               "application/json"
            },

            body:JSON.stringify(
               transferData
            )
         }
      );

      const result =
      await req.json();
   
      

      
    if (result==='insuficient funds') {
      hi.innerHTML='insufficient funds'
      showError('insufficient funds');
    }else{
      pinModal.style.display = 'none';
      bck.innerHTML=''
      transferPage.style.display = 'none';
      successBox.style.display = 'block';
    }
      

      localStorage.removeItem(
         "pendingTransfer"
      );

   }else{

      pii.innerHTML='incorrect pin'

   }}

}

con.addEventListener('click', confirmTransfer)