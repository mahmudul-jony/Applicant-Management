document.addEventListener("DOMContentLoaded", function () {
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectedDate = null;

    // Get DOM elements with error checking
    const monthYearDisplay = document.getElementById("monthYear");
    const calendarGrid = document.getElementById("calendarGrid");
    const calendarContainer = document.getElementById("calendarContainer");
    const dateTimePickerBtn = document.getElementById("dateTimePickerBtn");
    const timeInput = document.getElementById("timeInput");
    const toggleAmPm = document.getElementById("toggleAmPm");
    const applyBtn = document.getElementById("applyBtn");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");

    // Check if all required elements exist
    if (!monthYearDisplay || !calendarGrid || !calendarContainer || !dateTimePickerBtn || 
        !timeInput || !toggleAmPm || !applyBtn || !prevMonthBtn || !nextMonthBtn) {
        console.error("Calendar elements not found. Calendar functionality disabled.");
        return;
    }

    function generateCalendar(month, year) {
        try {
            calendarGrid.innerHTML = "";
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            if (monthYearDisplay) {
                monthYearDisplay.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
            }

            const todayDay = today.getDate();
            const todayMonth = today.getMonth();
            const todayYear = today.getFullYear();

            // Add empty divs before the first day of the month
            for (let i = 0; i < firstDay; i++) {
                calendarGrid.innerHTML += '<div></div>';
            }

            // Create calendar days
            for (let day = 1; day <= daysInMonth; day++) {
                const button = document.createElement("button");
                button.className = "calendar-day p-2 rounded bg-gray-200 hover:bg-blue-300 active:bg-blue-500 active:text-white transition-all";

                // Highlight today's date
                if (day === todayDay && month === todayMonth && year === todayYear) {
                    button.classList.add("today-date");
                }

                button.textContent = day;
                button.setAttribute("data-day", day);
                button.setAttribute("data-month", month);
                button.setAttribute("data-year", year);
                button.addEventListener("click", selectDate);
                calendarGrid.appendChild(button);
            }
        } catch (error) {
            console.error("Error generating calendar:", error);
        }
    }

    function selectDate(event) {
        try {
            const day = parseInt(event.target.getAttribute("data-day"));
            const month = parseInt(event.target.getAttribute("data-month"));
            const year = parseInt(event.target.getAttribute("data-year"));

            // Validate date values
            if (isNaN(day) || isNaN(month) || isNaN(year)) {
                console.error("Invalid date values:", { day, month, year });
                return;
            }

            selectedDate = new Date(year, month, day); // Store selected date
            
            // Validate created date
            if (isNaN(selectedDate.getTime())) {
                console.error("Invalid date created:", selectedDate);
                return;
            }

            // Remove previous selection
            [...calendarGrid.children].forEach(btn => btn.classList.remove("selected-date"));
            event.target.classList.add("selected-date"); // Add selection class

            // Update button text with selected date and time
            if (dateTimePickerBtn && timeInput && toggleAmPm) {
                const formattedDate = `${Number(month) + 1}/${day}/${year}`;
                dateTimePickerBtn.textContent = `${formattedDate} ${timeInput.value || ''} ${toggleAmPm.textContent || 'AM'}`;
            }
        } catch (error) {
            console.error("Error selecting date:", error);
        }
    }

    // Month navigation with error handling
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener("click", () => {
            try {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                generateCalendar(currentMonth, currentYear);
            } catch (error) {
                console.error("Error navigating to previous month:", error);
            }
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener("click", () => {
            try {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                generateCalendar(currentMonth, currentYear);
            } catch (error) {
                console.error("Error navigating to next month:", error);
            }
        });
    }

    // AM/PM toggle with error handling
    if (toggleAmPm) {
        toggleAmPm.addEventListener("click", function () {
            try {
                this.innerText = this.innerText === "AM" ? "PM" : "AM";
            } catch (error) {
                console.error("Error toggling AM/PM:", error);
            }
        });
    }

    // Open calendar modal with error handling
    if (dateTimePickerBtn) {
        dateTimePickerBtn.addEventListener("click", (event) => {
            try {
                event.stopPropagation(); // Prevent event bubbling
                if (calendarContainer) {
                    calendarContainer.classList.remove("hidden");
                    generateCalendar(currentMonth, currentYear);
                }
            } catch (error) {
                console.error("Error opening calendar:", error);
            }
        });
    }

    // Close modal when clicking outside with error handling
    document.addEventListener("click", (event) => {
        try {
            if (calendarContainer && dateTimePickerBtn) {
                if (!calendarContainer.contains(event.target) && event.target !== dateTimePickerBtn) {
                    calendarContainer.classList.add("hidden");
                }
            }
        } catch (error) {
            console.error("Error handling outside click:", error);
        }
    });

    // Apply selected date and time with error handling
    if (applyBtn) {
        applyBtn.addEventListener("click", () => {
            try {
                if (selectedDate && !isNaN(selectedDate.getTime())) {
                    const selectedTime = timeInput ? timeInput.value : '';
                    const selectedAmPm = toggleAmPm ? toggleAmPm.innerText : 'AM';
                    const formattedDateTime = `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()} ${selectedTime} ${selectedAmPm}`;
                    
                    // Use a more user-friendly notification instead of alert
                    showNotification(`Date and Time Selected: ${formattedDateTime}`, 'success');
                    
                    if (calendarContainer) {
                        calendarContainer.classList.add("hidden");
                    }
                } else {
                    showNotification("Please select a date first.", 'error');
                }
            } catch (error) {
                console.error("Error applying date and time:", error);
                showNotification("Error applying date and time.", 'error');
            }
        });
    }

    // Helper function to show notifications
    function showNotification(message, type = 'info') {
        try {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
                type === 'success' ? 'bg-green-500 text-white' : 
                type === 'error' ? 'bg-red-500 text-white' : 
                'bg-blue-500 text-white'
            }`;
            notification.textContent = message;
            
            // Add to page
            document.body.appendChild(notification);
            
            // Remove after 3 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 3000);
        } catch (error) {
            console.error("Error showing notification:", error);
            // Fallback to alert if notification fails
            alert(message);
        }
    }

    // Initialize calendar on load with error handling
    try {
        generateCalendar(currentMonth, currentYear);
    } catch (error) {
        console.error("Error initializing calendar:", error);
    }
});
