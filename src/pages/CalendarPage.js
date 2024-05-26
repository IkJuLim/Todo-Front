import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from '../components/Calendar';
import EventForm from '../components/EventForm';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const addEvent = async (event) => {
    try {
      const response = await axios.post('/api/events', event, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEvents([...events, response.data]);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const updateEvent = async (id, updatedEvent) => {
    try {
      const response = await axios.put(`/api/events/${id}`, updatedEvent, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEvents(events.map((event) => (event._id === id ? response.data : event)));
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`/api/events/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const deleteAllEvents = async () => {
    try {
      await axios.delete('/api/events', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEvents([]);
    } catch (error) {
      console.error('Error deleting all events:', error);
    }
  };

  return (
    <div>
      <h1>My Calendar</h1>
      <EventForm onSubmit={addEvent} />
      <Calendar events={events} onUpdate={updateEvent} onDelete={deleteEvent} onDeleteAll={deleteAllEvents} />
    </div>
  );
};

export default CalendarPage;
