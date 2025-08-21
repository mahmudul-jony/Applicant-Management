function openTab(event, tabId) {
    try {
        // Validate parameters
        if (!event || !tabId) {
            console.error("Invalid parameters for openTab function");
            return;
        }

        // Hide all tab containers
        const tabContainers = document.querySelectorAll('.tab-container');
        if (tabContainers.length === 0) {
            console.warn("No tab containers found");
            return;
        }
        
        tabContainers.forEach(tab => {
            if (tab) {
                tab.classList.add('hidden');
            }
        });
        
        // Remove active styling from all buttons
        const tabButtons = document.querySelectorAll('.tab-button');
        if (tabButtons.length === 0) {
            console.warn("No tab buttons found");
            return;
        }
        
        tabButtons.forEach(button => {
            if (button) {
                button.classList.remove('active');
            }
        });
        
        // Show the selected tab and apply active styling to the button
        const selectedTab = document.getElementById(tabId);
        if (selectedTab) {
            selectedTab.classList.remove('hidden');
        } else {
            console.error(`Tab with ID '${tabId}' not found`);
            return;
        }
        
        if (event.currentTarget) {
            event.currentTarget.classList.add('active');
        }
        
    } catch (error) {
        console.error("Error in openTab function:", error);
    }
}

// Set the default active tab on page load
document.addEventListener("DOMContentLoaded", function() {
    try {
        const activeTabButton = document.querySelector('.tab-button.btn-tab.active');
        if (activeTabButton) {
            // Simulate a click event to properly initialize the tab
            const clickEvent = new Event('click', { bubbles: true });
            activeTabButton.dispatchEvent(clickEvent);
        } else {
            console.warn("No active tab button found on page load");
        }
    } catch (error) {
        console.error("Error setting default active tab:", error);
    }
});

// Helper function to get current active tab
function getCurrentActiveTab() {
    try {
        const activeButton = document.querySelector('.tab-button.btn-tab.active');
        if (activeButton) {
            const tabId = activeButton.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
            return tabId;
        }
        return null;
    } catch (error) {
        console.error("Error getting current active tab:", error);
        return null;
    }
}

// Helper function to switch to a specific tab by ID
function switchToTab(tabId) {
    try {
        if (!tabId) {
            console.error("Tab ID is required");
            return;
        }
        
        const tabButton = document.querySelector(`[onclick*="${tabId}"]`);
        if (tabButton) {
            const clickEvent = new Event('click', { bubbles: true });
            tabButton.dispatchEvent(clickEvent);
        } else {
            console.error(`Tab button for '${tabId}' not found`);
        }
    } catch (error) {
        console.error("Error switching to tab:", error);
    }
}