import { useEffect, useState } from "react";
import axios from "axios";
import "./modal.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/events").then((res) => {
      setEvents(res.data);
    });
  }, []);

  const handleSubmit = async () => {
    if (!email || !consent) {
      alert("Please enter email and give consent");
      return;
    }

    await axios.post("http://localhost:5000/api/leads", {
      email,
      consent,
      eventId: selectedEvent._id,
    });

    window.open(selectedEvent.sourceUrl, "_blank");
    setSelectedEvent(null);
    setEmail("");
    setConsent(false);
  };

  return (
    <>
      {events.map((event) => (
        <div className="event-card" key={event._id}>
          <h3>{event.title}</h3>
          <p><b>City:</b> {event.city}</p>
          <p><b>Source:</b> {event.source}</p>

          <button
            className="ticket-btn"
            onClick={() => setSelectedEvent(event)}
          >
            GET TICKETS
          </button>
        </div>
      ))}

      {/* MODAL */}
      {selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Get Tickets</h2>
            <p className="subtitle">
              Enter your email to continue to the ticket site
            </p>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="checkbox">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              I agree to receive event updates
            </label>

            <div className="modal-actions">
              <button className="cancel" onClick={() => setSelectedEvent(null)}>
                Cancel
              </button>
              <button className="continue" onClick={handleSubmit}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Events;
