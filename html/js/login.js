// ALL OF THIS IS AJAX ENABLED


document.addEventListener("DOMContentLoaded", function () {
  // Get a reference to the form
  const form = document.getElementById("login-form");
  // Add a submit event listener to the form
  form.addEventListener("submit", function (event) 
  {
      event.preventDefault(); // Prevent the default form submission behavior

      // Get input values
      const login = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Create a JavaScript object
      const userData = {
          login: login,
          password: password,
      };

      // Convert the JavaScript object to JSON
      const jsonData = JSON.stringify(userData);

      // Create a new XMLHttpRequest or use the fetch API to send the JSON data to your PHP script
      // Here's an example using XMLHttpRequest:
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "../PHP/loginUser.php", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              // Parse the JSON response from the PHP script
              const response = JSON.parse(xhr.responseText);
        
              // Check if the response contains any data or errors
              if (response.error) {
                // Handle an error in the response
                // errors that can happen here is solely duplicate username
                console.error("Error:", response.error);
                const errorMessage = document.getElementById("error-message");
                errorMessage.textContent = "Username or Password is Invalid";
                errorMessage.style.color = "red";
              } else {
                console.log("Login Successful!");
                // Handle a successful response
                console.log("ID:", response.id);
                console.log("First Name:", response.firstName);
                console.log("Last Name:", response.lastName);
                localStorage.setItem('userInfo', response.id);
                localStorage.setItem('fLetter', response.firstName.charAt(0));
                window.location.href = '../contacts/index.html';
              }
            } 
            else {
              // Request failed
              console.error("Login failed.");
              //formatting for the error message on an invalid registration that will appear on the user's end
              const errorMessage = document.getElementById("error-message");
              errorMessage.textContent = "Username or Password is Invalid";
              errorMessage.style.color = "red"; // Set the text color to red or customize it as needed
            }
          }
      };
      xhr.send(jsonData);
  });
});
