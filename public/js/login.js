
let loginBtn;

loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener('click', loginHandler);

function loginHandler (event ) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });

        document.location.replace('/');
    
        // if (response.ok) {
        //   document.location.replace('/');
        // } else {
        //   alert('Failed to log in.');
        // }
    }else {
          alert('Incorrect  password, please try again.');
    }

    // if (response.ok) {
    //     document.location.replace('/');
    //   } else {
    //     alert('Failed to log in.');
    //   }
    console.log("Successfull Babe");
}

// const loginFormHandler = async (event) => {
//     event.preventDefault();
  
//     const email = document.querySelector('#email-login').value.trim();
//     const password = document.querySelector('#password-login').value.trim();
  
//     if (email && password) {
//       const response = await fetch('/api/users/login', {
//         method: 'POST',
//         body: JSON.stringify({ email, password }),
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (response.ok) {
//         document.location.replace('/');
//       } else {
//         alert('Failed to log in.');
//       }
//     }
//   };
  