import React, { useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

function Calendar() {
  const [events, setEvents] = useState([
    {
      id: uuidv4(),
      title: "The Title",
      start: "2024-10-14T08:00:00",
      end: "2024-10-14T09:00:00",
      description: "This is the description for the event", // Add description
    },
  ]);

  const [editingEventId, setEditingEventId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // State untuk add event
  const [eventDate, setEventDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");

  // Fungsi untuk menambah event
  const addEvent = () => {
    if (!eventDate || !eventStartTime || !eventEndTime) {
      alert("Please provide date and time for the event.");
      return;
    }

    const newEvent = {
      id: uuidv4(),
      title: "New Added Event",
      start: `${eventDate}T${eventStartTime}`,
      end: `${eventDate}T${eventEndTime}`,
      description: "New event description", // Default description
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);

    // Reset input setelah menambah event
    setEventDate("");
    setEventStartTime("");
    setEventEndTime("");
    setNewDescription("");
  };

  // Fungsi untuk menghapus event berdasarkan id
  const removeEvent = (idToRemove) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== idToRemove)
    );
  };

  // Fungsi untuk mengedit event
  const editEvent = (idToEdit, newTitle, newDescription) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === idToEdit
          ? { ...event, title: newTitle, description: newDescription }
          : event
      )
    );
    setEditingEventId(null); // Reset editing state
    setNewTitle(""); // Reset input title
    setNewDescription(""); // Reset input description
  };

  // Fungsi untuk menangani klik pada event
  const handleEventClick = (eventInfo) => {
    setEditingEventId(eventInfo.event.id);
    setNewTitle(eventInfo.event.title); // Set title ke input
    setNewDescription(eventInfo.event.extendedProps.description); // Set description ke input
  };

  return (
    <div>
      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={addEvent}>
          Add Event
        </button>
        <button
          className="btn btn-danger me-2"
          onClick={() => removeEvent(editingEventId)} // Menghapus event yang sedang diedit
        >
          Remove Event
        </button>
      </div>

      {/* Input untuk menambah event */}
      <div className="mb-3">
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="me-2"
        />
        <input
          type="time"
          value={eventStartTime}
          onChange={(e) => setEventStartTime(e.target.value)}
          className="me-2"
        />
        <input
          type="time"
          value={eventEndTime}
          onChange={(e) => setEventEndTime(e.target.value)}
          className="me-2"
        />
        <button className="btn btn-success" onClick={addEvent}>
          Add Event
        </button>
      </div>

      {editingEventId && (
        <div className="mb-3">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Edit Event Title"
          />
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Edit Event Description"
            className="ms-2"
          />
          <button
            className="btn btn-success"
            onClick={() => editEvent(editingEventId, newTitle, newDescription)}
          >
            Save
          </button>
          <button
            className="btn btn-secondary ms-2"
            onClick={() => setEditingEventId(null)} // Cancel edit
          >
            Cancel
          </button>
        </div>
      )}

      <Fullcalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={events}
        eventClick={handleEventClick} // Menangani klik pada event
        eventDidMount={(info) => {
          return new bootstrap.Popover(info.el, {
            title: info.event.title,
            placement: "auto",
            trigger: "hover",
            customClass: "popoverStyle",
            content: `<p>${info.event.extendedProps.description}</p>`, // Show description
            html: true,
          });
        }}
      />
    </div>
  );
}

export default Calendar;