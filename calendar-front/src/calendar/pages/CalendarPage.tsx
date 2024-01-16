import { Calendar, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "..";
import { CalendarEvents, getMessagesES, localizer } from '../../helpers';
import { useState } from 'react';

import { useCalendar, useUiStore } from '../../hooks';

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendar();

  const [lastView, setLastView] = useState<View>(
    localStorage.getItem('lastView') as View || 'week'
  );

  const eventStyleGetter = (
    // event: CalendarEvents,
    // start: Date,
    // end: Date,
    // isSelected: boolean
  ) => {
    const style = {
      backgroundColor: '#347cf7',
      borderRadius: '0px',
      marginLeft: '0.5px',
      opacity: 0.8,
      color: 'white',
    };

    return {
      style
    };
  };

  const onDoubleClick = () => {
    openDateModal();
  };

  const onClick = ( event: CalendarEvents ) => {
    setActiveEvent(event);
  };

  // saves current page in localStorage
  const onViewChange = ( currentView: View ) => {
    console.log({ viewChange: currentView });
    localStorage.setItem('lastView', currentView);
    setLastView(currentView);
  };

  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events ?? []}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onClick}
        onView={onViewChange}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
