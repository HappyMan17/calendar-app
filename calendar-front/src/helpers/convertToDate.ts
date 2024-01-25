import { parseISO } from "date-fns";
import { CalendarEvents } from ".";

export const convertToDate = (events: CalendarEvents[]) => {
  return events.map(event => {
    event.start = parseISO(`${event.start}`);
    event.end = parseISO(`${event.end}`);
    return event;
  });
};
