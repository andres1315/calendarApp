import { Calendar, CalendarProps} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours} from 'date-fns'
import {  NavbarCalendar } from "../components/Navbar"
import { localizer,getMessagesES } from '../../helpers'
import { useState } from 'react'
import { CalendarEvents } from '../components/CalendarEvents'
import { CalendarModal } from '../components/CalendarModal'


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

const myEventsList = [
  {
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
]



export const CalendarPage = () => {
  const [lastView, setLastView] = useState<string>(localStorage.getItem('lastView') || 'week')


  // ... existing code ...
  const onDoubleClick = (e: any) => {
  // ... existing code ...
    console.log('double click',e)
  }
  
  const onSelect = (e: any) => {
    console.log('select',e)
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
        events={myEventsList}
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
    </>
  )
}
