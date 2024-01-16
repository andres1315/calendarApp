import { EventCalendar, changeToActiveEvent, onAddNewEvent, onRemoveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"

export const useCalendarStore = ()=>{
  
  const dispatch = useAppDispatch()
  const {events, activeEvent} = useAppSelector(state => state.calendar)

  const setActieEvent = (event: EventCalendar) => {
    dispatch(changeToActiveEvent(event))
  }

  const startSavingEvent = async(calendarEvent) => {
    // todo legar al back

    // todo actualizar el store
    if (calendarEvent._id) {
      // actualizar
      dispatch(onUpdateEvent({...calendarEvent}))
    } else {
      // crear
      dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime().toString()}))
    }
  }


  const deleteEvent=()=>{
    dispatch(onRemoveEvent())
  }
  
  return {
    events,
    activeEvent,
    setActieEvent,
    startSavingEvent,
    deleteEvent
  }
}