import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector, useDispatch } from "react-redux";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { dateFnsLocalizer, Calendar as BigCalendar } from "react-big-calendar";
import { useState, useEffect } from "react";
import { fetchTasks } from "../store/store";
import Sidebar from "../components/Sidebar";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function Calendar() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    const mappedEvents = tasks.map((task) => {
      const [hours, minutes] = task.time ? task.time.split(":") : [0, 0];
      const startDate = new Date(task.date);
      startDate.setHours(hours, minutes);

      return {
        title: task.text,
        start: startDate,
        end: startDate,
      };
    });
    setEvents(mappedEvents);
  }, [tasks]);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
          Calendar
        </h1>
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{
              height: "70vh", // גובה כולל ללוח השנה
              padding: "10px",
              fontSize: "14px",
              lineHeight: "1.2",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
            selectable
            onSelectEvent={(event) => alert(`Task: ${event.title}`)}
            onSelectSlot={(slotInfo) =>
              alert(
                `Selected slot from ${slotInfo.start.toLocaleString()} to ${slotInfo.end.toLocaleString()}`
              )
            }
            views={["month", "week", "day", "agenda"]}
            popup
            components={{
              event: CustomEvent,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// רכיב מותאם אישית להצגת אירועים
function CustomEvent({ event }) {
  return (
    <div
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        maxWidth: "100%", // התאמת רוחב התא
        maxHeight: "1.5em", // התאמת גובה הטקסט
        padding: "2px 4px",
      }}
      title={event.title} // הצגת הטקסט המלא במעבר עכבר
    >
      {event.title}
    </div>
  );
}
