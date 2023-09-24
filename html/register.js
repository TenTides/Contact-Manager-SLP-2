document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the form
    const form = document.getElementById("registration-form");
    // Add a submit event listener to the form
    form.addEventListener("submit", function (event) 
    {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get input values
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        // Create a JavaScript object
        const userData = {
            username: username,
            password: password,
            confirmPassword: confirmPassword,
        };

        // Convert the JavaScript object to JSON
        const jsonData = JSON.stringify(userData);

        // Create a new XMLHttpRequest or use the fetch API to send the JSON data to your PHP script
        // Here's an example using XMLHttpRequest:
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "registerUser.php", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Request was successful
                console.log("Registration successful!");
                // re route to home page and with the list contacts
                // You can handle the response from the PHP script here
            } else {
                // Request failed
                console.error("Registration failed.");
            }
        }
        };
        xhr.send(jsonData);
    });
});
