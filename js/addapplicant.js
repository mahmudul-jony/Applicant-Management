function openaddapplicantmodal() {
    console.log("Opening Add Applicant modal");
    const modal = document.getElementById("add-Applicant-modal");
    if (modal) {
        modal.classList.remove("hidden");
        modal.style.display = "block";
        // Only hide applicant list if the section exists
        const listSection = document.getElementById("applicant-list-section");
        if (listSection) {
            listSection.style.display = "none";
        }
    } else {
        alert("Add Applicant modal not found. Please check the modal's ID in your HTML.");
        console.error("Modal element with ID 'add-Applicant-modal' not found");
    }
}

function closeaddapplicantmodal() {
    console.log("Closing Add Applicant modal");
    const modal = document.getElementById("add-Applicant-modal");
    if (modal) {
        modal.classList.add("hidden");
        modal.style.display = "none";
        // Only show applicant list if the section exists
        const listSection = document.getElementById("applicant-list-section");
        if (listSection) {
            listSection.style.display = "block";
        }
    } else {
        console.error("Modal element with ID 'add-Applicant-modal' not found");
    }
}
