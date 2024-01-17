import Swal from "sweetalert2"
import { calendarApi } from "../api/calendarApi"
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents"
import { EventCalendar, changeToActiveEvent, onAddNewEvent, onLoadEvents, onRemoveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"

export const useCalendarStore = ()=>{
  
  const dispatch = useAppDispatch()
  const {events, activeEvent} = useAppSelector(state => state.calendar)
  const {user} = useAppSelector(state => state.auth)

  const setActieEvent = (event: EventCalendar) => {
    dispatch(changeToActiveEvent(event))
  }

  const startSavingEvent = async(calendarEvent) => {
    // todo legar al back

   
    // todo actualizar el store
    try{
      if (calendarEvent.id) {
        // actualizar
  
        
          const {data} = await calendarApi.put(`/events/${calendarEvent.id}`,calendarEvent)
        
        dispatch(onUpdateEvent({...calendarEvent}))
      } else {
        // crear
  
          const {data} = await calendarApi.post('/events',calendarEvent)
          dispatch(onAddNewEvent({...calendarEvent, id: data.event.id, user}))
       
      }
    }catch(error){
      console.log(error)
      if(error.response?.data?.msg){
        Swal.fire('Error',error.response.data.msg,'error')
        return
      }
      Swal.fire('Error','Error al guardar el evento','error')
    }
    
  }

  const startLoadingEvents = async() => {
    try{
      const {data} = await calendarApi.get('/events')
      const events  = convertEventsToDateEvents(data.events)
      dispatch(onLoadEvents(events))
    }catch(error){
      console.log(error)
    }
  
  }


  const deleteEvent=async()=>{
    if(!activeEvent) return
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`)
      Swal.fire('Deleted',`Event ${activeEvent.title} deleted`,'success')
      dispatch(onRemoveEvent())
    }catch(error){
      console.log(error)
      const message  = error.response?.data?.msg || 'Error al eliminar el evento'
      Swal.fire('Error',message,'error')
    }

    //dispatch(onRemoveEvent())
  }
  
  return {
    events,
    activeEvent,
    setActieEvent,
    startSavingEvent,
    deleteEvent,
    startLoadingEvents
  }
}