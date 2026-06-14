

async function getUserDetails() {

const useremail= document.getElementById('email');
const email= useremail.value;

const UserPass= document.getElementById('createPassword');
const password= UserPass.value;
const newUser={
  email,
  password
}

  try {
    const req= await fetch('/login', {
        method: 'POST',
        headers:{"Content-type":"application/json"},
        body: JSON.stringify(newUser)
    })

    const res= await req.json()
    
    if(res){
      location.assign('/email-otp')
    }

  } catch (error) {
    console.log(error, 'failed to fetch')
  }

}

const signbtn= document.getElementById('sign');

signbtn.addEventListener('click', getUserDetails);