// Enhanced script for more-menu with error handling and improved positioning
document.addEventListener("DOMContentLoaded", function() {
    try {
        // Initialize popover functionality for all buttons with data-popover attribute
        initializePopovers();
        
        // Set up global event listeners
        setupGlobalEventListeners();
        
    } catch (error) {
        console.error("Error initializing popover system:", error);
    }
});

// Debounce function to prevent rapid clicking
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// State management for popovers
let isPopoverOpen = false;
let currentPopover = null;
let currentButton = null;

function initializePopovers() {
    try {
        const popoverButtons = document.querySelectorAll(".btn-more");
        
        if (popoverButtons.length === 0) {
            console.warn("No popover buttons found");
            return;
        }
        
        popoverButtons.forEach((button) => {
            if (button) {
                button.addEventListener("click", debounce(handlePopoverClick, 150));
            }
        });
        
    } catch (error) {
        console.error("Error initializing popovers:", error);
    }
}

function handlePopoverClick(event) {
    try {
        event.stopPropagation();
        
        const button = event.currentTarget;
        const popoverId = button.getAttribute("data-popover");
        
        if (!popoverId) {
            console.error("No popover ID specified for button");
            return;
        }
        
        const popover = document.getElementById(popoverId);
        if (!popover) {
            console.error(`Popover with ID '${popoverId}' not found`);
            return;
        }

        // Check if this popover is already open
        if (isPopoverOpen && currentPopover === popover) {
            // Close the popover if it's already open
            closeAllPopovers();
            return;
        }

        // Close other popovers before opening the clicked one
        closeAllPopovers(popover);

        // Update state
        isPopoverOpen = true;
        currentPopover = popover;
        currentButton = button;

        // Add body class to prevent scrollbars
        document.body.classList.add('popover-open');

        // Position and show the popover
        positionPopover(button, popover);
        
    } catch (error) {
        console.error("Error handling popover click:", error);
    }
}

function closeAllPopovers(excludePopover = null) {
    try {
        const allPopovers = document.querySelectorAll(".popover-menu");
        allPopovers.forEach((menu) => {
            if (menu !== excludePopover) {
                menu.classList.add("hidden");
                // Reset positioning to prevent scrollbar issues
                resetPopoverPosition(menu);
            }
        });
        
        // Reset state if closing all popovers
        if (!excludePopover) {
            isPopoverOpen = false;
            currentPopover = null;
            currentButton = null;
            // Remove body class to restore normal scrolling
            document.body.classList.remove('popover-open');
        }
    } catch (error) {
        console.error("Error closing all popovers:", error);
    }
}

function resetPopoverPosition(popover) {
    try {
        // Reset any inline styles that might cause positioning issues
        popover.style.position = '';
        popover.style.top = '';
        popover.style.left = '';
        popover.style.zIndex = '';
        popover.style.transform = '';
    } catch (error) {
        console.error("Error resetting popover position:", error);
    }
}

function positionPopover(button, popover) {
    try {
        const rect = button.getBoundingClientRect();
        const popoverHeight = popover.offsetHeight;
        const popoverWidth = popover.offsetWidth;

        // Get viewport dimensions
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        // Get custom offsets
        const offsetX = parseInt(button.getAttribute("data-offset-x") || 0);
        const offsetY = parseInt(button.getAttribute("data-offset-y") || 8);

        // Calculate available space
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;
        const spaceRight = viewportWidth - rect.left;
        const spaceLeft = rect.right;

        // Determine best position
        let top, left;
        let positionClass = "";

        // Vertical positioning
        if (spaceBelow >= popoverHeight || spaceBelow > spaceAbove) {
            // Place below button
            top = rect.bottom + window.scrollY + offsetY;
            positionClass = "top-full";
        } else {
            // Place above button
            top = rect.top + window.scrollY - popoverHeight - offsetY;
            positionClass = "bottom-full";
        }

        // Horizontal positioning - use consistent positioning based on button location
        if (button.classList.contains('btn-more') && button.id === 'btn-more') {
            // Main more button - always position to the right with consistent offset
            left = rect.right + window.scrollX + offsetX;
        } else {
            // Table more buttons - position to the left with consistent offset
            left = rect.left + window.scrollX + offsetX;
        }

        // Ensure popover stays within viewport bounds
        left = Math.max(10, Math.min(left, viewportWidth - popoverWidth - 10));
        top = Math.max(10, Math.min(top, viewportHeight - popoverHeight - 10));

        // Apply positioning with absolute positioning
        popover.style.position = 'absolute';
        popover.style.top = `${top}px`;
        popover.style.left = `${left}px`;
        popover.style.zIndex = '9999';
        
        // Ensure no transform or other positioning properties interfere
        popover.style.transform = 'none';
        popover.style.margin = '0';
        popover.style.padding = '0';
        
        // Remove old position classes and add new one
        popover.classList.remove("top-full", "bottom-full", "left-full", "right-full");
        popover.classList.add(positionClass);
        
        // Show the popover
        popover.classList.remove("hidden");
        
        // Add focus trap for accessibility
        setupFocusTrap(popover);
        // Ensure popover is in the body for proper positioning
        if (popover.parentElement !== document.body) {
            document.body.appendChild(popover);
        }
        
        // Add focus trap for accessibility
        setupFocusTrap(popover);
        
    } catch (error) {
        console.error("Error positioning popover:", error);
    }
}

function setupFocusTrap(popover) {
    try {
        const focusableElements = popover.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // Focus first element
        firstElement.focus();
        
        // Handle tab navigation
        popover.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            } else if (e.key === 'Escape') {
                closeAllPopovers();
            }
        });
        
    } catch (error) {
        console.error("Error setting up focus trap:", error);
    }
}

function setupGlobalEventListeners() {
    try {
        // Hide popovers when clicking a menu option
        document.querySelectorAll(".popover-menu").forEach((popover) => {
            if (popover) {
                popover.addEventListener("click", (event) => {
                    // Only close if clicking on a button or link
                    if (event.target.tagName === 'BUTTON' || event.target.tagName === 'A') {
                        popover.classList.add("hidden");
                    }
                });
            }
        });

        // Hide popovers when clicking outside
        document.addEventListener("click", (event) => {
            const isPopoverButton = event.target.classList.contains("btn-more") || 
                                   event.target.closest(".btn-more");
            const isPopoverContent = event.target.closest(".popover-menu");
            
            if (!isPopoverButton && !isPopoverContent) {
                closeAllPopovers();
            }
        });

        // Hide popovers on window resize
        window.addEventListener("resize", () => {
            closeAllPopovers();
        });

        // Hide popovers on scroll
        window.addEventListener("scroll", () => {
            closeAllPopovers();
        });
        
    } catch (error) {
        console.error("Error setting up global event listeners:", error);
    }
}

// Public API functions
window.PopoverManager = {
    closeAll: closeAllPopovers,
    open: function(buttonId, popoverId) {
        try {
            const button = document.getElementById(buttonId);
            const popover = document.getElementById(popoverId);
            
            if (button && popover) {
                closeAllPopovers();
                positionPopover(button, popover);
            }
        } catch (error) {
            console.error("Error opening popover programmatically:", error);
        }
    }
};

