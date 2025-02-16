// script for onboard applicant modal
function openonboardapplicantmodal() {
    document.getElementById("applicant-onboard").style.display = "block";
    }
    
    function closeonboardapplicantmodal() {
    document.getElementById("applicant-onboard").style.display = "none";
    }

// script for applicant profile modal
function openapplicantprofilemodal() {
    document.getElementById("applicant-profile").style.display = "block";
    }
    
    function closeapplicantprofilemodal() {
    document.getElementById("applicant-profile").style.display = "none";
    }

// // script for menu
document.querySelectorAll(".btn-more").forEach((button) => {
    button.addEventListener("click", (event) => {
        event.stopPropagation();
        
        // Get corresponding popover menu using data attribute
        const popoverId = button.getAttribute("data-popover");
        const popover = document.getElementById(popoverId);

        if (!popover) return;

        // Close all other popovers before opening the clicked one
        document.querySelectorAll(".popover-menu").forEach((menu) => {
            if (menu !== popover) {
                menu.style.display = "none";
            }
        });

        // Toggle popover
        if (popover.style.display === "none" || popover.style.display === "") {
            const rect = button.getBoundingClientRect();

            // Get custom position from data attributes (if provided)
            const offsetX = button.getAttribute("data-offset-x") || 0;
            const offsetY = button.getAttribute("data-offset-y") || 8;

            popover.style.top = `${rect.bottom + window.scrollY + parseInt(offsetY)}px`;
            popover.style.left = `${rect.left + window.scrollX + parseInt(offsetX)}px`;
            popover.style.display = "block";
        } else {
            popover.style.display = "none";
        }
    });
});

// Hide popover when clicking a menu option
document.querySelectorAll(".popover-menu").forEach((popover) => {
    popover.addEventListener("click", () => {
        popover.style.display = "none";
    });
});

// Hide popovers when clicking outside
document.addEventListener("click", (event) => {
    document.querySelectorAll(".popover-menu").forEach((popover) => {
        if (!popover.contains(event.target) && !event.target.classList.contains("btn-more")) {
            popover.style.display = "none";
        }
    });
});
