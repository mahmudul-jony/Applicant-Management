// script for middle section
function openaddapplicantmodal() {
    try {
        const modal = document.getElementById("add-Applicant-modal");
        const listSection = document.getElementById("applicant-list-section");
        
        if (modal && listSection) {
            modal.style.display = "block";
            listSection.style.display = "none";
        } else {
            console.error("Required modal elements not found");
        }
    } catch (error) {
        console.error("Error opening add applicant modal:", error);
    }
}

function closeaddapplicantmodal() {
    try {
        const modal = document.getElementById("add-Applicant-modal");
        const listSection = document.getElementById("applicant-list-section");
        
        if (modal && listSection) {
            modal.style.display = "none";
            listSection.style.display = "block";
            
            // Reset form fields
            const form = modal.querySelector("form");
            if (form) {
                form.reset();
            }
        } else {
            console.error("Required modal elements not found");
        }
    } catch (error) {
        console.error("Error closing add applicant modal:", error);
    }
}

// script for onboard applicant modal
function openonboardapplicantmodal() {
    try {
        const modal = document.getElementById("applicant-onboard");
        if (modal) {
            modal.style.display = "block";
        } else {
            console.error("Onboard applicant modal not found");
        }
    } catch (error) {
        console.error("Error opening onboard applicant modal:", error);
    }
}

function closeonboardapplicantmodal() {
    try {
        const modal = document.getElementById("applicant-onboard");
        if (modal) {
            modal.style.display = "none";
        } else {
            console.error("Onboard applicant modal not found");
        }
    } catch (error) {
        console.error("Error closing onboard applicant modal:", error);
    }
}

// script for applicant profile modal
function openapplicantprofilemodal() {
    try {
        const modal = document.getElementById("applicant-profile");
        if (modal) {
            modal.style.display = "block";
        } else {
            console.error("Applicant profile modal not found");
        }
    } catch (error) {
        console.error("Error opening applicant profile modal:", error);
    }
}

function closeapplicantprofilemodal() {
    try {
        const modal = document.getElementById("applicant-profile");
        if (modal) {
            modal.style.display = "none";
        } else {
            console.error("Applicant profile modal not found");
        }
    } catch (error) {
        console.error("Error closing applicant profile modal:", error);
    }
}

// script for add university modal
function openadduniversitymodal() {
    try {
        const modal = document.getElementById("add-university");
        if (modal) {
            modal.style.display = "block";
        } else {
            console.error("Add university modal not found");
        }
    } catch (error) {
        console.error("Error opening add university modal:", error);
    }
}

// Fixed typo in function name
function closeadduniversitymodal() {
    try {
        const modal = document.getElementById("add-university");
        if (modal) {
            modal.style.display = "none";
            
            // Reset form fields
            const form = modal.querySelector("form");
            if (form) {
                form.reset();
            }
        } else {
            console.error("Add university modal not found");
        }
    } catch (error) {
        console.error("Error closing add university modal:", error);
    }
}

// Global function to close all modals
function closeAllModals() {
    try {
        const modals = [
            "add-Applicant-modal",
            "applicant-onboard", 
            "applicant-profile",
            "add-university"
        ];
        
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "none";
            }
        });
        
        // Show applicant list section
        const listSection = document.getElementById("applicant-list-section");
        if (listSection) {
            listSection.style.display = "block";
        }
    } catch (error) {
        console.error("Error closing all modals:", error);
    }
}

// Close modals when clicking outside
document.addEventListener("DOMContentLoaded", function() {
    try {
        // Close modals when clicking outside
        document.addEventListener("click", function(event) {
            const modals = document.querySelectorAll("[id$='-modal'], [id$='-onboard'], [id$='-profile'], [id$='-university']");
            
            modals.forEach(modal => {
                if (modal.style.display === "block" && !modal.contains(event.target)) {
                    // Check if click is not on a button that opens the modal
                    const isModalButton = event.target.closest('[onclick*="open"]');
                    if (!isModalButton) {
                        modal.style.display = "none";
                        
                        // Reset forms when closing modals
                        const form = modal.querySelector("form");
                        if (form) {
                            form.reset();
                        }
                        
                        // Show applicant list section if it was hidden
                        if (modal.id === "add-Applicant-modal") {
                            const listSection = document.getElementById("applicant-list-section");
                            if (listSection) {
                                listSection.style.display = "block";
                            }
                        }
                    }
                }
            });
        });
        
        // Close modals with Escape key
        document.addEventListener("keydown", function(event) {
            if (event.key === "Escape") {
                closeAllModals();
            }
        });
        
    } catch (error) {
        console.error("Error setting up modal event listeners:", error);
    }
});