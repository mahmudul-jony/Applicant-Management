function openaddapplicantmodal() {
    console.log("Opening Add Applicant modal");
    const modal = document.getElementById("add-Applicant-modal");
    if (modal) {
        modal.classList.remove("hidden");
        modal.style.display = "block";
        document.getElementById("applicant-list-section").style.display = "none";
    } else {
        console.error("Modal element with ID 'add-Applicant-modal' not found");
    }
}

function closeaddapplicantmodal() {
    console.log("Closing Add Applicant modal");
    const modal = document.getElementById("add-Applicant-modal");
    if (modal) {
        modal.classList.add("hidden");
        modal.style.display = "none";
        document.getElementById("applicant-list-section").style.display = "block";
    } else {
        console.error("Modal element with ID 'add-Applicant-modal' not found");
    }
}
