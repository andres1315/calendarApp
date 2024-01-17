import { Calendar} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {  NavbarCalendar } from "../components/Navbar"
import { localizer,getMessagesES } from '../../helpers'
import { useEffect, useState } from 'react'
import { CalendarEvents } from '../components/CalendarEvents'
import { CalendarModal } from '../components/CalendarModal'
import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { FabAddNew } from '../components/FabAddNew'
import { FaPlusCircle,FaRegTrashAlt } from "react-icons/fa";
import { FabDelete } from '../components/FabDelete'
import { useAuthStore } from '../../hooks/useAuthStore'







export const CalendarPage = () => {
  const {user } = useAuthStore()
  const {events, activeEvent,setActieEvent, startLoadingEvents} = useCalendarStore()
  const {onOpenModal} = useUiStore()
  const [lastView, setLastView] = useState<string>(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event: any, start: Date, end: Date, isSelected: boolean) => {

    const isMyEvent = (event.user._id === user.uid) || (event.user.uid === user.uid)
    return {
      className: 'custom-event-class',
      style: {
        backgroundColor: isMyEvent ? '#347cf7' :'#465660',
        opacity: 0.8,
        color: 'white',
      },
    };
  }
  

  const onDoubleClick = (e: any) => {
    onOpenModal()
  }
  
  const onSelect = (e: any) => {
    setActieEvent(e)
  }
  
  const onViewChange = (e: any) => {
    setLastView(e)
    localStorage.setItem('lastView',e)
  }

  useEffect(()=>{
    startLoadingEvents()
  },[])
  return (
    <>
      <NavbarCalendar />  
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 65px)' }}
        messages={getMessagesES}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvents
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />
      <CalendarModal />
      <FabAddNew className='animate__animated animate__pulse animate__infinite'>
        <FaPlusCircle size={30} />
      </FabAddNew>
      {
        activeEvent && (
          <FabDelete className='animate__animated animate__pulse animate__infinite'>
            <FaRegTrashAlt size={30} />
          </FabDelete>
        )
      }

      
    </>
  )
}
