// script for onboard modal
function openonboardapplicantmodal() {
    document.getElementById("applicant-onboard").style.display = "block";
    }
    
    function closeonboardapplicantmodal() {
    document.getElementById("applicant-onboard").style.display = "none";
    }

// // script for menu
const button = document.getElementById("btn-more");
        const popover = document.getElementById("more-menu");

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