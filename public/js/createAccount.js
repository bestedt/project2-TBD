// Initiate create account process, Event listener for create account button
document.getElementById('createAccountBtn').addEventListener('click', async () => {
  // Get user input values
    const usertype = document.getElementById('usertype-create').value;
    const username = document.getElementById('username-create').value;
    const email = document.getElementById('email-create').value;
    const password = document.getElementById('password-create').value;
  // Send POST request to create account
    try {
      const response = await fetch('/api/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Serialize the JSON body
        body: JSON.stringify({ usertype, username, email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Account created successfully
        alert('Account created successfully! You can now log in.');
      } else {
        // Handle errors
        console.error(data.error);
        alert('Error creating account. Please try again.');
      }
    } catch (error) {
      console.error('Error creating user account:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  });
  