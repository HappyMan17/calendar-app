import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import { CalendarEvents } from '../../helpers';

// import { addHours } from 'date-fns';
// const tempEvents = [{
//   _id: `${new Date().getTime()}`,
//   title: 'Cumple Gaby',
//   notes: 'Hay que comprar el pastel',
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   bgColor: '#fafafa',
//   user: {
//     _id: '123',
//     name: 'Sebastian',
//   }
// }];

export interface CalendarState {
  isLoading: boolean;
  events: CalendarEvents[];
  activeEvent: CalendarEvents | null
}

const initialState: CalendarState = {
  isLoading: false,
  events: [],
  activeEvent: null
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events?.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events?.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      }) ?? state.events;
    },
    onDeleteEvent: (state) => {
      if (!state.activeEvent) {
        return;
      }
      state.events = state.events?.filter(event =>
        event._id !== state.activeEvent?._id,
      ) ?? state.events;
    },
    onLoadEvents: (state, { payload }) => {
      state.isLoading = false;
      // state.events = payload;
      payload.forEach((event: CalendarEvents) => {
        const exist = state.events?.some(dbEvent => dbEvent.id === event.id);
        if (exist) {
          state.events?.push(event);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.activeEvent = null;
      state.events = [];
      state.isLoading = false;
    },
  },
});

//Action creators are generated for each case reducer function
export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
} = calendarSlice.actions;
