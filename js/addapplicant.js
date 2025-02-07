// script for middle section
function openNav() {
document.getElementById("add-Applicant").style.display = "block";
document.getElementById("applicant-list").style.display = "none";
}

function closeNav() {
document.getElementById("add-Applicant").style.display = "none";
document.getElementById("applicant-list").style.display = "block";
}

// script for menu
function toggleMenu() {
    var menu = document.getElementById("popoverMenu");
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
}

// Close the menu when clicking outside
document.addEventListener("click", function(event) {
    var menu = document.getElementById("popoverMenu");
    var button = document.querySelector(".menu-button");
    
    if (!button.contains(event.target) && !menu.contains(event.target)) {
        menu.style.display = "none";
    }
});



// script for tab
function openmain(evt, main) {
var i, tabcontent, tablinks;

tabcontent = document.getElementsByClassName("tabcontent");
for (i = 0; i < tabcontent.length; i++) {
tabcontent[i].style.display = "none";
}

tablinks = document.getElementsByClassName("tablinks");
for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("text-teal-800", "border-b", "border-teal-800");
}

document.getElementById(main).style.display = "block";

evt.currentTarget.classList.add("text-teal-800", "border-b", "border-teal-800");
}

document.getElementById("Activity-tab").click();


// script for modal
// let modal = document.getElementById("add-applicant-modal");
//     let btn = document.getElementById("add-Applicants");
//     let button = document.getElementById("Close");

//     btn.onclick = function () {
//       modal.style.display = "block";
//     };
//     button.onclick = function () {
//       modal.style.display = "none";
//     };
//     window.onclick = function (event) {
//       if (event.target == modal) {
//         modal.style.display = "none";
//       }
//     };