// script for middle section
function openNav() {
document.getElementById("add-Applicant").style.display = "block";
document.getElementById("applicant-list").style.display = "none";
}

function closeNav() {
document.getElementById("add-Applicant").style.display = "none";
document.getElementById("applicant-list").style.display = "block";
}

// script for onboard modal
function openonboard() {
document.getElementById("applicant-onboard").style.display = "block";
}

function closeonboard() {
document.getElementById("applicant-onboard").style.display = "none";
}

// // script for menu
const button = document.getElementById("btn-more");
        const popover = document.getElementById("popoverMenu");

        function togglePopover() {
            if (popover.style.display === "none" || popover.style.display === "") {
                const rect = button.getBoundingClientRect();
                popover.style.top = `${rect.bottom + window.scrollY + 8}px`;
                popover.style.left = `${rect.left + window.scrollX + -136}px`;
                popover.style.display = "block";
            } else {
                popover.style.display = "none";
            }
        }

        // Show/Hide Popover on button click
        button.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent clicking button from triggering document click
            togglePopover();
        });

        // Hide popover when clicking a menu option
        popover.addEventListener("click", () => {
            popover.style.display = "none";
        });

        // Hide popover when clicking outside
        document.addEventListener("click", (event) => {
            if (!popover.contains(event.target) && event.target !== button) {
                popover.style.display = "none";
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