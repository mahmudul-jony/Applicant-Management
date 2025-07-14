console.log("addapplicant.js loaded");

function openaddapplicantmodal() {
    console.log("Opening Add Applicant modal");
    document.getElementById("add-Applicant-modal").style.display = "block";
    document.getElementById("applicant-list-section").style.display = "none";
}

function closeaddapplicantmodal() {
    console.log("Closing Add Applicant modal");
    document.getElementById("add-Applicant-modal").style.display = "none";
    document.getElementById("applicant-list-section").style.display = "block";
}

function openonboardapplicantmodal() {
    console.log("Opening Onboard Applicant modal");
    document.getElementById("applicant-onboard").style.display = "block";
}

function closeonboardapplicantmodal() {
    console.log("Closing Onboard Applicant modal");
    document.getElementById("applicant-onboard").style.display = "none";
}

function openapplicantprofilemodal() {
    console.log("Opening Applicant Profile modal");
    document.getElementById("applicant-profile").style.display = "block";
}

function closeapplicantprofilemodal() {
    console.log("Closing Applicant Profile modal");
    document.getElementById("applicant-profile").style.display = "none";
}

function openadduniversitymodal() {
    console.log("Opening Add University modal");
    const modal = document.getElementById("add-university");
    if (modal) {
        modal.style.display = "block";
        console.log("Modal display set to block");
    } else {
        console.error("Modal element with ID 'add-university' not found");
    }
}

function closeadduniversitymodal() {
    console.log("Closing Add University modal");
    const modal = document.getElementById("add-university");
    if (modal) {
        modal.style.display = "none";
        console.log("Modal display set to none");
    } else {
        console.error("Modal element with ID 'add-university' not found");
    }
}
