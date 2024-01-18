import { createSlice } from "@reduxjs/toolkit";


/* const tempEvent ={
  id: new Date().getTime().toString(),
  title: 'Cumpleaños jefe',
  notes:'notes',
  start: new Date(),
  end: addHours(new Date(), 1),
  bgColor: '#3174ad',
  user:{
    _id:'123',
    name:'jose'
  }
} */
export const calendarSlice =  createSlice({
  name: 'calendar',
  initialState: {
    isLoadingEvents: true,
    events:[
      //tempEvent
    ],
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
      state.events = state.events.map(event => event.id === payload.id ? payload : event)
    
    },
    onRemoveEvent : (state ) => {
      state.events = state.events.filter(event => event.id !== state.activeEvent.id)
      state.activeEvent=null
    
    },
    onLoadEvents : (state, {payload=[]}) => {
      state.isLoadingEvents=false
      state.events = [...payload]
      payload.forEach(event => {
        const exist = state.events.some(e => e.id === event.id)
        if(!exist){
          state.events.push(event)
        }
      })
    
    
    },

    onLogoutCalendar: (state) => {
      state.activeEvent=null
      state.events=[]
      state.isLoadingEvents=true
    }
  }
})

export const {changeToActiveEvent, onAddNewEvent,onUpdateEvent,onRemoveEvent,onLoadEvents,onLogoutCalendar} = calendarSlice.actions
export const calendarReducer = calendarSlice.reducer
