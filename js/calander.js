let today = new Date();
        let currentMonth = today.getMonth();
        let currentYear = today.getFullYear();

        const monthYearDisplay = document.getElementById("monthYear");
        const calendarGrid = document.getElementById("calendarGrid");
        const calendarContainer = document.getElementById("calendarContainer");
        const dateTimePickerBtn = document.getElementById("dateTimePickerBtn");
        const timeInput = document.getElementById("timeInput");
        const toggleAmPm = document.getElementById("toggleAmPm");

        function generateCalendar(month, year) {
            calendarGrid.innerHTML = "";
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            monthYearDisplay.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
            
            for (let i = 0; i < firstDay; i++) {
                calendarGrid.innerHTML += '<div></div>';
            }
            for (let day = 1; day <= daysInMonth; day++) {
                const isPast = new Date(year, month, day) < today.setHours(0, 0, 0, 0);
                const button = document.createElement("button");
                button.className = `p-2 rounded ${day === today.getDate() && month === today.getMonth() ? 'bg-blue-500 text-white' : 'bg-gray-200'} ${isPast ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-300'}`;
                button.textContent = day;
                button.disabled = isPast;
                button.addEventListener("click", () => {
                    selectDate(day, month, year);
                });
                calendarGrid.appendChild(button);
            }
        }
        generateCalendar(currentMonth, currentYear);

        function selectDate(day, month, year) {
            [...calendarGrid.children].forEach(btn => btn.classList.remove("bg-blue-500", "text-white"));
            event.target.classList.add("bg-blue-500", "text-white");
            const formattedDate = `${month + 1}/${day}/${year}`;
            dateTimePickerBtn.textContent = `${formattedDate} ${timeInput.value} ${toggleAmPm.textContent}`;
            calendarContainer.classList.add("hidden");
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

        let isAm = true;
        toggleAmPm.addEventListener("click", function () {
            isAm = !isAm;
            this.innerText = isAm ? "AM" : "PM";
        });

        // Toggle calendar visibility
        dateTimePickerBtn.addEventListener("click", () => {
            calendarContainer.classList.toggle("hidden");
        });

        // Close calendar when clicking outside
        document.addEventListener("click", (event) => {
            if (!calendarContainer.contains(event.target) && event.target !== dateTimePickerBtn) {
                calendarContainer.classList.add("hidden");
            }
        });