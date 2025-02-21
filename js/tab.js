function openTab(event, tabId) {
    // Hide all tab containers
    document.querySelectorAll('.tab-container').forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // Remove active styling from all buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Show the selected tab and apply active styling to the button
    document.getElementById(tabId).classList.remove('hidden');
    event.currentTarget.classList.add('active');
}

// Set the default active tab on page load
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.tab-button.btn-tab.active').click();
});