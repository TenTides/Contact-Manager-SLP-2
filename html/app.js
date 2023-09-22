/* eslint-disable */

const contact_form = document.querySelector(".add_contact");

document.querySelector("#add").addEventListener("click", function() {
  contact_form.classList.add("active");
});

document.querySelector(".add_contact .close-btn").addEventListener("click", function() {
  contact_form.classList.remove("active");
});

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {

  event.preventDefault();

  const data = new FormData(event.target);

  const value = Object.fromEntries(data.entries());

  console.log({ value });

  contact_form.classList.remove("active");

  var table = document.getElementById("contact_table");
  var firstRow = table.rows[table.rows.length];

  var img = new Image(40, 40);
  img.src = "icons/icon_user.svg";

  var row = table.insertRow(table.rows.length);
  row.setAttribute("onclick", "select(this);");
  var pfp = row.insertCell(0);
  pfp.appendChild(img);
  var name = row.insertCell(1);
  var about = row.insertCell(2);

  name.innerHTML = value["first"].bold();
  about.innerHTML = value["about"];

  addform = document.getElementById("addform");
  addform.reset();
}


var display_name = document.getElementById("display_name");
var display_about = document.getElementById("display_about");
var display_email = document.getElementById("display_email");
var phone_info = document.getElementById("phone_info");


function select(row) {
  var currentRow = row.cells[1].textContent;
  display_name.innerHTML = row.cells[1].textContent;
  display_about.innerHTML = row.cells[2].textContent;
}
