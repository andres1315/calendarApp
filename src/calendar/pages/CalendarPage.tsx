import { Calendar} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours} from 'date-fns'
import {  NavbarCalendar } from "../components/Navbar"
import { localizer,getMessagesES } from '../../helpers'
import type { CalendarEvent } from '../../types/calendar'


const eventStyleGetter = (event: CalendarEvent, start: Date, end: Date, isSelected: boolean) => {
  console.log({event, start, end, isSelected});
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
  }
]
export const CalendarPage = () => {
  return (
    <>
      <NavbarCalendar />  
      <Calendar
        culture='es'
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 65px)' }}
        messages={getMessagesES}
        eventPropGetter={eventStyleGetter}
      />
    </>
  )
}
