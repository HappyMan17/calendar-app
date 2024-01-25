import { useAppDispatch, useAppSelector } from ".";
import { calendarApi } from "../api";
import { CalendarEvents, convertToDate } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendar = () => {
  const { events, activeEvent } = useAppSelector(state => state.calendar);
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const setActiveEvent = (calendarEvent: CalendarEvents) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  //* Thunk alternative
  const startSavingEvent = async(calendarEvent: CalendarEvents) => {
    // todo: save the event in the backend
    try {
      if (calendarEvent.id) {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        // update/
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
      } else {
        // create
        const { data } = await calendarApi.post('/events', calendarEvent);

        dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
      }
    } catch (error) {
      console.log('Error updating events');
    }
  };

  const startDeleteEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent?.id}`);
      console.log('event Removed');
      dispatch(onDeleteEvent());

    } catch (error) {
      //* Delete event in backend
      console.log('Error removing event');
    }
  };

  const startLoadingEvent = async () => {
    try {
      const { data } = await calendarApi.get('/event');
      const events = convertToDate(data.events);

      dispatch(onLoadEvents(events));

    } catch (error) {
      console.log('Error loading events');
    }
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
    startLoadingEvent,
  };
};
