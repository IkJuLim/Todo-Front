import React, { useState } from 'react';

const Calendar = ({ events, onUpdate, onDelete, onDeleteAll }) => {
  const [select, setSelect] = useState([]);

  return (
    <div>
      <button onClick={onDeleteAll}>Delete All Events</button>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <button onClick={() => onUpdate(event._id, { title: 'Updated Title', description: 'Updated Description' })}>Update</button>
            <button onClick={() => onDelete(event._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {CALENDER_RESULT_LIST.map((item) => (
        <div className="flex px-20 w-full" key={Math.random()}>
          {item.map((day) => (
            <button
              onClick={() => {
                const findItem = select.find((item) => item === day);
                if (findItem) {
                  setSelect((state) => state.filter((item) => item !== day));
                } else {
                  setSelect((state) => [...state, day]);
                }
              }}
              className={`flex justify-between min-w-[calc(100%/7)] active:bg-blue-500 hover:bg-blue-400 items-center text-center ${
                day === 0 ? 'invisible' : ''
              }
                  ${select.find((item) => item === day) ? 'bg-blue-600' : ''}`}
              key={Math.random()}
            >
              <div className="mx-auto">{day}</div>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
