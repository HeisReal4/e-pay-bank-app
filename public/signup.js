const slides = document.querySelectorAll(".slide");

let currentIndex = 0;
const slideInterval = 2000; // 2 seconds

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

// Start auto-slide
setInterval(nextSlide, slideInterval);
// Initialize first slide
showSlide(currentIndex);


  


async function getUserDetails() {
   const UserName= document.getElementById('firstname');
  const firstName=UserName.value;
  const lastname= document.getElementById('lastname');
const UserLast=lastname.value;

const useremail= document.getElementById('email');
const email= useremail.value;

const password= document.getElementById('createPassword');
const UserPass= password.value;
const newUser={
  firstName,
  UserLast,
  email,
  UserPass
}

  try {
    const req= await fetch('http://localhost:4000/addUser', {
        method: 'POST',
        headers:{"Content-type":"application/json"},
        body: JSON.stringify(newUser)
    })
    
    const res = await req.json()
    if(res){
      location.assign('/email-otp')
    }

  } catch (error) {
    console.log(error, 'failed to fetch')
  }

}

const signbtn= document.getElementById('sign');

signbtn.addEventListener('click', getUserDetails);