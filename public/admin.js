const emailEl= document.getElementById('email');

const amountEL= document.getElementById('amount');

const btn= document.getElementById('btn');



async function addFunds(){
  const Email= emailEl.value;
  const Amount= Number(amountEL.value);
const fund={
  email: Email,
  amount: Amount
}
try {
  const req= await fetch('/addFunds', {
    method:'POST',
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(fund)
  })

const result= await req.json()

console.log(result);


} catch (error) {
  console.log(error.message)
}
}


btn.addEventListener('click', addFunds);




const form = document.getElementById("uploadForm");

form.addEventListener("submit", async (e)=>{

   e.preventDefault();

   const formData = new FormData(form);

   try{

      const response = await fetch("/addImage",{

            method:"POST",
            body:formData

         });

      const data = await response.json();

      console.log(data);

      alert(data.message);

   }catch(error){

      console.log(error);

   }

});