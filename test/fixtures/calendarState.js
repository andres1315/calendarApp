export const events =[
  {
    id: '1',
    title: 'Cumpleaños Andres',
    notes:'Some notes test 1',
    start: new Date('2021-09-01 13:00:00'),
    end: new Date('2021-09-01 14:00:00'),
  },
  {
    id: '2',
    title: 'Cumpleaños Tatiana',
    notes:'Some notes test 2',
    start: new Date('2021-10-01 13:00:00'),
    end: new Date('2021-10-01 14:00:00'),
  }

]

export const initialState ={
  isLoadingEvents: true,
  events:[],
  activeEvent: null,
}


export const calendarWithEventsState = {
  isLoadingEvents: false,
  events:[...events],
  activeEvent: null,
}

export const calendarWithEventsActiveState = {
  isLoadingEvents: false,
  events:[...events],
  activeEvent: {...events[0]},
}

