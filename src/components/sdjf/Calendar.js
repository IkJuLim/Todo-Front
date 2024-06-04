import React, { useEffect } from 'react';

const Calendar = ({ currentYear, currentMonth, setCurrentMonth, handleDateClick }) => {
  useEffect(() => {
    generateCalendar(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  const generateCalendar = (year, month) => {
    const calendarElement = document.getElementById('calendar');
    const currentMonthElement = document.getElementById('currentMonth');

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarElement.innerHTML = '';

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    currentMonthElement.innerText = `${monthNames[month]} ${year}`;

    const firstDayOfWeek = firstDayOfMonth.getDay();

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
      const dayElement = document.createElement('div');
      dayElement.className = 'text-center font-semibold';
      dayElement.innerText = day;
      calendarElement.appendChild(dayElement);
    });

    for (let i = 0; i < firstDayOfWeek; i++) {
      const emptyDayElement = document.createElement('div');
      calendarElement.appendChild(emptyDayElement);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.className = 'text-center py-2 border cursor-pointer';
      dayElement.innerText = day;

      const currentDate = new Date();
      if (year === currentDate.getFullYear() && month === currentDate.getMonth() && day === currentDate.getDate()) {
        dayElement.classList.add('bg-blue-500', 'text-white');
      }

      dayElement.addEventListener('click', () => {
        handleDateClick(new Date(year, month, day));
      });

      calendarElement.appendChild(dayElement);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-6 py-3 bg-gray-700">
        <button onClick={() => setCurrentMonth(currentMonth - 1)} className="text-white">Previous</button>
        <h2 id="currentMonth" className="text-white"></h2>
        <button onClick={() => setCurrentMonth(currentMonth + 1)} className="text-white">Next</button>
      </div>
      <div className="grid grid-cols-7 gap-2 p-4" id="calendar">
        {/* Calendar Days Go Here */}
      </div>
    </div>
  );
};

export default Calendar;
