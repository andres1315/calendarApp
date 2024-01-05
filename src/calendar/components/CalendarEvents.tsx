import type { CalendarEvent } from '../types/CalendarEvent'
interface Props{
  event : CalendarEvent
}

export const CalendarEvents = ({event}:Props) => {
  const {title, user} = event
  console.log(user)
  return (
    <>
      <strong>{title}</strong>
      <span>- {user?.name}</span>
    </>
  )
}
