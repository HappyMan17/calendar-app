import { useAppDispatch, useAppSelector } from ".";
import { CalendarEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendar = () => {
  const { events, activeEvent } = useAppSelector(state => state.calendar);
  const dispatch = useAppDispatch();

  const setActiveEvent = (calendarEvent: CalendarEvents) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  //* Thunk alternative
  const startSavingEvent = async(calendarEvent: CalendarEvents) => {
    // todo: save the event in the backend

    if (calendarEvent._id) {
      // update
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // create
      //* this id is temporary, backend will create it
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  const startDeleteEvent = async () => {
    //* Delete event in backend
    dispatch(onDeleteEvent());
  };

  return {
    //* Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    //* Methods
    setActiveEvent,
    startSavingEvent,
    deleteEvent: startDeleteEvent,
  };
};
