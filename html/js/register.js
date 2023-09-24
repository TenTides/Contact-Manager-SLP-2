// ALL OF THIS IS AJAX ENABLED
// redirects REQUIRED HERE
document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the form
    const form = document.getElementById("registration-form");
    // Add a submit event listener to the form
    form.addEventListener("submit", function (event) 
    {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get input values
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const login = document.getElementById("login").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm_password").value;

        // Create a JavaScript object
        const userData = {
            firstName: firstName,
            lastName: lastName,
            login: login,
            password: password,
            confirmPassword: confirmPassword,
        };

        // Convert the JavaScript object to JSON
        const jsonData = JSON.stringify(userData);
        // Create a new XMLHttpRequest or use the fetch API to send the JSON data to your PHP script
        // Here's an example using XMLHttpRequest:
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "PHP/registerUser.php", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                // Request was successful
                console.log("Registration successful!");
          
                // Parse the JSON response from the PHP script
                const response = JSON.parse(xhr.responseText);
          
                // Check if the response contains any data or errors
                if (response.error) {
                  // Handle an error in the response
                  // errors that can happen here is solely duplicate username
                  console.error("Error:", response.error);
                } else {
                  // Handle a successful response
                  console.log("ID:", response.id);
                  console.log("First Name:", response.firstName);
                  console.log("Last Name:", response.lastName);
                  console.log("Username:", response.login);
                  //Successful redirect would go here

                }
              } 
              else {
                // Request failed
                console.error("Registration failed.");
                //formatting for the error message on an invalid registration that will appear on the user's end
                const errorMessage = document.getElementById("error-message");
                errorMessage.textContent = "Registration failed. The username might already exist or the passwords do not match.";
                errorMessage.style.color = "red"; // Set the text color to red or customize it as needed
              }
            }
        };
        xhr.send(jsonData);
    });
});
