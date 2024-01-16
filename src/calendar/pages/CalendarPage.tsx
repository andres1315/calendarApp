import { Calendar} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {  NavbarCalendar } from "../components/Navbar"
import { localizer,getMessagesES } from '../../helpers'
import { useState } from 'react'
import { CalendarEvents } from '../components/CalendarEvents'
import { CalendarModal } from '../components/CalendarModal'
import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { FabAddNew } from '../components/FabAddNew'
import { FaPlusCircle,FaRegTrashAlt } from "react-icons/fa";
import { FabDelete } from '../components/FabDelete'


const eventStyleGetter = (event: any, start: Date, end: Date, isSelected: boolean) => {
  return {
    className: 'custom-event-class',
    style: {
      backgroundColor: '#347cf7',
      opacity: 0.8,
      color: 'white',
    },
  };
}





export const CalendarPage = () => {
  const [lastView, setLastView] = useState<string>(localStorage.getItem('lastView') || 'week')
  const {onOpenModal} = useUiStore()
  const {events, activeEvent,setActieEvent} = useCalendarStore()


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
