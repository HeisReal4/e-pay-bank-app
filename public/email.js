
const inpt= document.querySelectorAll(".otpcnt input");

inpt.forEach((input, index)=>{
  input.addEventListener("input", ()=>{
if (input.value.length===1 && index<inpt.length-1) {
  inpt[index + 1].focus()
}

  })
})

inpt.forEach((input, index)=>{
  input.addEventListener("keydown", (e)=>{
if (e.key==='Backspace' && input.value==='' && index > 0) {
  inpt[index - 1].focus()
}
})
})



const btn= document.getElementById('btn');


async function verify() {
  let otp= ""
inpt.forEach(val=>{
  otp+=val.value;
})
  const code= otp;
  console.log(code, typeof(code))
  const emaildata={code}
  try {
    const req= await fetch('/verifyemail',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(emaildata)
    })
    const res= await req.json()
    if(res==='email incorrect or expired'){
      console.log('email incorrect or expired')
    }else{ if(res.admin){
      location.assign('/admin');
    }else{   location.assign('/posts');}}

  } catch (error) {
    console.log(error.message)
  }
}

btn.addEventListener('click', verify);