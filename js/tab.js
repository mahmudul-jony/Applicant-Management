function openTab(event, tabId) {
    // Hide all tab containers
    document.querySelectorAll('.tab-container').forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // Remove active styling from all buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('bg-blue-600', 'text-white');
        button.classList.add('bg-gray-400', 'text-black');
    });
    
    // Show the selected tab and apply active styling to the button
    document.getElementById(tabId).classList.remove('hidden');
    event.currentTarget.classList.add('bg-blue-600', 'text-white');
    event.currentTarget.classList.remove('bg-gray-400', 'text-black');
}

// Set the default active tab on page load
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".tab-button").click();
});