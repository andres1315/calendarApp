import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent ={
  _id: new Date().getTime().toString(),
  title: 'Cumpleaños jefe',
  notes:'notes',
  start: new Date(),
  end: addHours(new Date(), 1),
  bgColor: '#3174ad',
  user:{
    _id:'123',
    name:'jose'
  }
}
export const calendarSlice =  createSlice({
  name: 'calendar',
  initialState: {
    events:[tempEvent],
    activeEvent: null,
  },
  reducers: {
    changeToActiveEvent: (state, {payload}) => {
      state.activeEvent = payload
    },
    onAddNewEvent : (state, {payload}) => {
      state.events.push(payload)
      state.activeEvent=null
    },
    onUpdateEvent : (state, {payload}) => {
      state.events = state.events.map(event => event._id === payload._id ? payload : event)
    
    },
    onRemoveEvent : (state, ) => {
      state.events = state.events.filter(event => event._id !== state.activeEvent._id)
      state.activeEvent=null
    
    }
  }
})

export const {changeToActiveEvent, onAddNewEvent,onUpdateEvent,onRemoveEvent} = calendarSlice.actions
export const calendarReducer = calendarSlice.reducer
export type EventCalendar = typeof tempEvent