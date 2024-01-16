import { CalendarEvents } from "../../helpers";

interface CalendarProps {
  event: CalendarEvents
}

export const CalendarEvent: React.FC <CalendarProps> = ({ event }) => {
  const { title, user }  = event;

  return (
    <>
      <strong>{ title }</strong>
      <span>-{ user.name }</span>
    </>
  );
};
