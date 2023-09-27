/* eslint-disable */

// fix this once table populated from php
var display_name = document.getElementById("display_name");
var display_about = document.getElementById("display_about");
var display_email = document.getElementById("display_email");
var phone_info = document.getElementById("display_phone");


function select(row) {
  var currentRow = row.cells[1].textContent;
  display_name.innerHTML = row.cells[1].textContent;
  display_about.innerHTML = row.cells[2].textContent;
}


document.addEventListener("DOMContentLoaded", function() {
  const contact_form = document.getElementById("add_contact");
  // open create form
  document.querySelector("#add").addEventListener("click", function() {
    contact_form.classList.add("active");
  });
  // close create form
  document.getElementById("close-btn").addEventListener("click", function() {
    contact_form.classList.remove("active");
  });

  const edit_form = document.getElementById("edit_contact");
  // open edit form
  document.getElementById("editbtn").addEventListener("click", function() {
    // prefill inputs in edit form
    edit_form.children[1].children[1].value = display_name.innerHTML;
    edit_form.children[1].children[2].value = display_name.innerHTML;
    edit_form.children[1].children[3].value = display_email.innerHTML;
    edit_form.children[1].children[4].value = phone_info.innerHTML;
    edit_form.children[1].children[5].value = display_about.innerHTML;
    // make form visible
    edit_form.classList.add("active");
  });
  // close edit form
  document.getElementById("close-edit").addEventListener("click", function() {
    edit_form.classList.remove
    ("active");
  });

  const delete_form = document.getElementById("delete_contact");
  // open delete form
  document.getElementById("deletebtn").addEventListener("click", function() {
    delete_form.classList.add("active");
  });
  // close delete form
  document.querySelector("#delete_contact #no").addEventListener("click", function() {
    delete_form.classList.remove
    ("active");
  });

  // handle create contact submission
  contact_form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#add_contact #first").value + document.getElementById("last");
    const email = document.querySelector("#add_contact #email").value;
    const phone = document.querySelector("#add_contact #phone").value;

    const userData = {
      name: name,
      email: email,
      phone: phone
    };

    const jsonData = JSON.stringify(userData);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/html/PHP/createContact.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        if(xhr.status === 200) {
          console.log("Contact Added");

          const response = JSON.parse(xhr.responseText);

          if(response.error) {
            console.error("Error:", response.error)
          }
          else {
            console.log("ID:", response.id);
            console.log("Name:", response.name);
            console.log("Email:", response.email);
            console.log("Phone:", response.phone);
          }
          contact_form.classList.remove("active");
        }
        else {
          console.error("Failed to add contact.");

          const errorMessage = document.getElementById("error-message");
          errorMessage.textContent = "Failed to add contact.";
          errorMessage.style.color = "red";
        }
      }
    };
    xhr.send(jsonData);
  });

  // update contact submission
  edit_form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#edit_contact #first").value + document.getElementById("last");
    const email = document.querySelector("#edit_contact #email").value;
    const phone = document.querySelector("#edit_contact #phone").value;

    const userData = {
      name: name,
      email: email,
      phone: phone
    };

    const jsonData = JSON.stringify(userData);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/html/PHP/updateContact.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        if(xhr.status === 200) {
          console.log("Contact Updated");
          edit_form.classList.remove("active");
          const response = JSON.parse(xhr.responseText);

          if(response.error) {
            console.error("Error:", response.error)
          }
          else {
            console.log("ID:", response.id);
            console.log("Name:", response.name);
            console.log("Email:", response.email);
            console.log("Phone:", response.phone);
          }
          
        }
        else {
          console.error("Failed to edit contact.");
        }
      }
    };
    xhr.send(jsonData);
  });

  const delete_button = document.querySelector("#delete_contact #yes");

  // deleting contact
  delete_button.addEventListener("click", function (event) {
    event.preventDefault();

    const name = document.querySelector("#contact_info #display_name").value;
    const email = document.querySelector("#contact_info #email_info").value;
    const phone = document.querySelector("#contact_info #phone_info").value;

    const userData = {
      name: name,
      email: email,
      phone: phone
    };

    const jsonData = JSON.stringify(userData);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/html/PHP/deleteContact.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        if(xhr.status === 200) {
          console.log("Contact Updated");
          delete_form.classList.remove("active");
          const response = JSON.parse(xhr.responseText);

          if(response.error) {
            console.error("Error:", response.error)
          }
          else {
            console.log("ID:", response.id);
            console.log("Name:", response.name);
            console.log("Email:", response.email);
            console.log("Phone:", response.phone);
          }
        }
        else {
          console.error("Failed to delete contact.");
        }
      }
    };
    xhr.send(jsonData);
  });
});