import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import { CalendarEvents } from '../../helpers';

import { addHours } from 'date-fns';

const tempEvents = [{
  _id: `${new Date().getTime()}`,
  title: 'Cumple Gaby',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Sebastian',
  }
}];

export interface CalendarState {
  events: CalendarEvents[] | null;
  activeEvent: CalendarEvents | null
}

const initialState: CalendarState = {
  events: tempEvents,
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
        if (event._id === payload._id) {
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
    }
  },
});

//Action creators are generated for each case reducer function
export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
} = calendarSlice.actions;
