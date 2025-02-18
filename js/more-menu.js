// // script for more-menu
document.querySelectorAll(".btn-more").forEach((button) => {
    button.addEventListener("click", (event) => {
        event.stopPropagation();

        const popoverId = button.getAttribute("data-popover");
        const popover = document.getElementById(popoverId);
        if (!popover) return;

        // Close other popovers before opening the clicked one
        document.querySelectorAll(".popover-menu").forEach((menu) => {
            if (menu !== popover) {
                menu.classList.add("hidden");
            }
        });

        const rect = button.getBoundingClientRect();
        const popoverHeight = popover.offsetHeight;

        // Get viewport height dynamically (ignores h-screen limitations)
        const viewportHeight = window.innerHeight;

        // Calculate available space
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;

        // Get custom offsets (if provided)
        const offsetX = parseInt(button.getAttribute("data-offset-x") || 0);
        const offsetY = parseInt(button.getAttribute("data-offset-y") || 8);

        // Determine best position
        if (spaceBelow >= popoverHeight || spaceBelow > spaceAbove) {
            // Place below button
            popover.style.top = `${rect.bottom + window.scrollY + offsetY}px`;
            popover.classList.remove("bottom-full"); // Reset if previously above
        } else {
            // Place above button
            popover.style.top = `${rect.top + window.scrollY - popoverHeight - offsetY}px`;
            popover.classList.add("bottom-full");
        }

        popover.style.left = `${rect.left + window.scrollX + offsetX}px`;
        popover.classList.remove("hidden");
    });
});

// Hide popover when clicking a menu option
document.querySelectorAll(".popover-menu").forEach((popover) => {
    popover.addEventListener("click", () => {
        popover.classList.add("hidden");
    });
});

// Hide popovers when clicking outside
document.addEventListener("click", (event) => {
    document.querySelectorAll(".popover-menu").forEach((popover) => {
        if (!popover.contains(event.target) && !event.target.classList.contains("btn-more")) {
            popover.classList.add("hidden");
        }
    });
});

