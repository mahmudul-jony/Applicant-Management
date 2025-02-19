document.addEventListener("DOMContentLoaded", function () {
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectedDate = null;

    const monthYearDisplay = document.getElementById("monthYear");
    const calendarGrid = document.getElementById("calendarGrid");
    const calendarContainer = document.getElementById("calendarContainer");
    const dateTimePickerBtn = document.getElementById("dateTimePickerBtn");
    const timeInput = document.getElementById("timeInput");
    const toggleAmPm = document.getElementById("toggleAmPm");
    const applyBtn = document.getElementById("applyBtn");

    function generateCalendar(month, year) {
        calendarGrid.innerHTML = "";
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        monthYearDisplay.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

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
    }

    function selectDate(event) {
        const day = event.target.getAttribute("data-day");
        const month = event.target.getAttribute("data-month");
        const year = event.target.getAttribute("data-year");

        selectedDate = new Date(year, month, day); // Store selected date
        [...calendarGrid.children].forEach(btn => btn.classList.remove("selected-date")); // Remove previous selection
        event.target.classList.add("selected-date"); // Add selection class

        const formattedDate = `${Number(month) + 1}/${day}/${year}`;
        dateTimePickerBtn.textContent = `${formattedDate} ${timeInput.value} ${toggleAmPm.textContent}`;
    }

    document.getElementById("prevMonth").addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
    });

    document.getElementById("nextMonth").addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    });

    toggleAmPm.addEventListener("click", function () {
        this.innerText = this.innerText === "AM" ? "PM" : "AM";
    });

    // Open calendar modal
    dateTimePickerBtn.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent event bubbling
        calendarContainer.classList.remove("hidden");
        generateCalendar(currentMonth, currentYear);
    });

    // Close modal when clicking outside
    document.addEventListener("click", (event) => {
        if (!calendarContainer.contains(event.target) && event.target !== dateTimePickerBtn) {
            calendarContainer.classList.add("hidden");
        }
    });

    // Apply selected date and time
    applyBtn.addEventListener("click", () => {
        if (selectedDate) {
            const selectedTime = timeInput.value;
            const selectedAmPm = toggleAmPm.innerText;
            const formattedDateTime = `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()} ${selectedTime} ${selectedAmPm}`;
            alert(`Selected Date and Time: ${formattedDateTime}`);
            calendarContainer.classList.add("hidden");
        } else {
            alert("Please select a date first.");
        }
    });

    // Initialize calendar on load
    generateCalendar(currentMonth, currentYear);
});
