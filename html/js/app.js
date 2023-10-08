/* eslint-disable */

// fix this once table populated from php

let mobile;

if(window.innerWidth < 768){
  mobile = true;
  document.getElementById("exitcontact").classList.remove("hide");
}

var selected = 0;

function selectRow(row) {
  var display_name = document.getElementById("display_name");
  var display_email = document.getElementById("display_email");
  var phone_info = document.getElementById("display_phone");
  var display_id = document.getElementById("display_id");
  var currentRow = row;
  display_name.innerHTML = row.cells[1].textContent;
  display_email.innerHTML = row.cells[2].textContent;
  phone_info.innerHTML = row.cells[3].textContent;
  display_id.innerHTML = row.cells[4].textContent;


  if(selected == 0)
  {
    document.getElementById("name_info").classList.remove("hide");
    document.getElementById("email_info").classList.remove("hide");
    document.getElementById("phone_info").classList.remove("hide");
    document.getElementById("editbtn").classList.remove("hide");
    document.getElementById("deletebtn").classList.remove("hide");
    document.getElementById("select").classList.add("hide");
    selected = 1;
  }

  if(mobile = true)
  {
    document.getElementById("contact_info").classList.add("slide");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // import id from login
  const userInfo = localStorage.getItem('userInfo');
  console.log("user: " + userInfo);
  if(userInfo == null) window.location.href = "../index.html";

  // change profile icon letter
  const firstLetter = localStorage.getItem('fLetter');
  console.log(firstLetter);
  // document.getElementById("profile").innerHTML = firstLetter.bold();



  const contact_form = document.getElementById("add_contact");
  // open create form
  document.querySelector("#add").addEventListener("click", function () {
    contact_form.classList.add("active");
  });
  // close create form
  document.getElementById("close-btn").addEventListener("click", function () {
    contact_form.classList.remove("active");
  });

  const edit_form = document.getElementById("edit_contact");
  // open edit form
  document.getElementById("editbtn").addEventListener("click", function () {
    // prefill inputs in edit form
    const name = display_name.innerHTML.split(" ");
    edit_form.children[1].children[1].value = name[0];
    if(name[1] == null) edit_form.children[1].children[2].value = "";
    else edit_form.children[1].children[2].value = name[1];
    if(display_email.innerHTML == null) edit_form.children[1].children[3].value= "";
    else edit_form.children[1].children[3].value = display_email.innerHTML;
    if(display_phone.innerHTML == null) edit_form.children[1].children[4].value = "";
    else edit_form.children[1].children[4].value = display_phone.innerHTML;
    // make form visible
    edit_form.classList.add("active");
  });
  // close edit form
  document.getElementById("close-edit").addEventListener("click", function () {
    edit_form.classList.remove
      ("active");
  });

  const delete_form = document.getElementById("delete_contact");
  // open delete form
  document.getElementById("deletebtn").addEventListener("click", function () {
		console.log("delete form");
    delete_form.classList.add("active");
  });
  // close delete form
  document.querySelector("#delete_contact #no").addEventListener("click", function () {
    delete_form.classList.remove
      ("active");
  });

	const delete_user = document.getElementById("delete_user");
  // open delete form
  document.getElementById("profile").addEventListener("click", function () {
    delete_user.classList.add("active");
  });
  // close delete form
  document.querySelector("#delete_user #close-user").addEventListener("click", function () {
    delete_user.classList.remove("active");
  });

  // handle create contact submission
  contact_form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#add_contact #first").value + " " + document.querySelector("#add_contact #last").value;
    const email = document.querySelector("#add_contact #email").value;
    const phone = document.querySelector("#add_contact #phone").value;

    const userData = {
      name: name,
      email: email,
      phone: phone,
      userid: userInfo
    };

    console.log(userData.name);
    console.log(userData.email);
    console.log(userData.phone);
    console.log(userData.userid);

    const jsonData = JSON.stringify(userData);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../PHP/createContact.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log("Contact Added");

          const response = JSON.parse(xhr.responseText);

          if (response.error) {
            console.error("Error:", response.error)
          }
          else {
            console.log("ID:", response.id);
	          console.log("USERID:", response.userid);
            console.log("Name:", response.name);
            console.log("Email:", response.email);
            console.log("Phone:", response.phone);
	          search({searchquery: "", userid: userInfo});
          }
          contact_form.classList.remove("active");
          document.getElementById("addform").reset();
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

    const name = document.querySelector("#edit_contact #first").value + " " + document.querySelector("#edit_contact #last").value;
    const email = document.querySelector("#edit_contact #email").value;
    const phone = document.querySelector("#edit_contact #phone").value;
    var id = document.getElementById("display_id").innerHTML;

    const userData = {
      id: id,
      name: name,
      phone: phone,
      email: email,
      userid: userInfo
    };

    const jsonData = JSON.stringify(userData);
    console.log(jsonData);

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "../PHP/updateContact.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log("Edit");
          edit_form.classList.remove("active");
          const response = JSON.parse(xhr.responseText);

          if (response.error) {
            console.error("Error:", response.error)
          }
          else {
            console.log("ID:", response.id);
            console.log("Name:", response.name);
            console.log("Email:", response.email);
            console.log("Phone:", response.phone);
            search({searchquery: "", userid: userInfo});
            document.getElementById("display_name").innerHTML = response.name;
            document.getElementById("display_email").innerHTML = response.email;
            document.getElementById("display_phone").innerHTML = response.phone;
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
		console.log("click");
    event.preventDefault();

    var id = document.getElementById("display_id").innerHTML;

    const userData = {
      id: id,
      userid: userInfo
    };

    const jsonData = JSON.stringify(userData);
    console.log(jsonData);

    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "../PHP/deleteContact.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log("Delete");
          delete_form.classList.remove("active");

          search({searchquery: "", userid: userInfo});

          //remove contact from screen
	 				document.getElementById("name_info").classList.add("hide");
          document.getElementById("email_info").classList.add("hide");
          document.getElementById("phone_info").classList.add("hide");
          document.getElementById("editbtn").classList.add("hide");
          document.getElementById("deletebtn").classList.add("hide");
	  			document.getElementById("select").classList.remove("hide");
          selected = 0;
	  if(mobile == true) closecontact();
        }
        else {
          console.error("Failed to delete contact.");
        }
      }
    };
    xhr.send(jsonData);
  });

	const delete_user_button = document.querySelector("#delete_user #deleteaccount");

  // deleting contact
  delete_user_button.addEventListener("click", function (event) {
    event.preventDefault();

    var id = document.getElementById("display_id").innerHTML;

    const userData = {
      id: id,
      userid: userInfo
    };

    const jsonData = JSON.stringify(userData);
    console.log(jsonData);

    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "../PHP/deleteUser.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log("Delete User");
					console.log("going home");
					window.location.href = "../login/index.html";
        }
        else {
          console.error("Failed to delete contact.");
        }
      }
    };
    xhr.send(jsonData);
  });


  const logout_button = document.querySelector("#delete_user #logout");

  logout_button.addEventListener("click", function (event) {
    console.log("log");
    localStorage.setItem('userInfo', null);
    window.location.href = "../login/index.html";
  })


  // search
  const search_bar = document.getElementById("search");
  const table = document.getElementById("contact_table");

  const userData = {
    searchquery: "",
    userid: userInfo
  };

  console.log(userData);
  // initial search with empty searchquery to fill page
  search(userData);

  search_bar.addEventListener("input", e => {
    // get search bar input
    const value = e.target.value;

    userData.searchquery = value;
    console.log(userData);
    

    search(userData);
  })


  function search(userData)
  {
    console.log(userData.searchquery);
    while(table.rows.length > 0) table.deleteRow(0);
    const jsonData = JSON.stringify(userData);

    console.log("SEARCHING:" + jsonData);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../PHP/searchContact.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
  
          const response = JSON.parse(xhr.responseText);
          
          if (response.error) {
            console.error("Error:", response.error)
          }
          else {
		      console.log(response);
      
      // hide default text if list isnt empty (maybe check if undef instead?)
      if(response[0].error == "")
      {
        document.getElementById("nodisplay").classList = "hide";
      }
      else
      {
        console.log("empty search");
        document.getElementById("nodisplay").classList.remove("hide");
        return;
      }
      
      // insert each returned contact
      for(let i = 0; i < response.length; i++)
      {

          let row = table.insertRow(-1);
          row.setAttribute("onclick", "selectRow(this);");
          let c1 = row.insertCell(0);
          let c2 = row.insertCell(1);
          let c3 = row.insertCell(2);
          let c4 = row.insertCell(3);
          let c5 = row.insertCell(4);

          const imgE = document.createElement("img");
          imgE.id = "user_icon";
          imgE.src = "../contacts/icons/icon_user.svg";
          c1.appendChild(imgE);
          c2.innerText = response[i].name;
          c3.innerText = response[i].email;
          c3.className = "hide";
          c4.innerText = response[i].phone;
          c4.className = "hide";
          c5.innerText = response[i].id;
          c5.className = "hide";
      }
          }
        }
        else {
          console.error("Search failed.");
        }
      }
      
    };
    xhr.send(jsonData);
  }

});


function resizeDisplay(){
  const contactList = document.getElementById("contacts");
  const contactInfo = document.getElementById("contact_info");
  
}

function closecontact(){
  document.getElementById("contact_info").classList.remove("slide");
}

function deleteUser(){
	
}
