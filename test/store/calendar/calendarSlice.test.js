import { calendarSlice, changeToActiveEvent, onAddNewEvent, onLoadEvents, onLogoutCalendar, onRemoveEvent, onUpdateEvent } from '../../../src/store/calendar/calendarSlice';
import { calendarWithEventsActiveState, calendarWithEventsState, events, initialState } from '../../fixtures/calendarState';
describe('Test on calendarSlice', () => {
  test('should return initial state', () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  })


  test('onLoad events Calendar',()=>{
    const state = calendarSlice.reducer(initialState,onLoadEvents(events));
    expect(state).toEqual(calendarWithEventsState);
  })

  test('change on active events Calendar',()=>{
    const state = calendarSlice.reducer(calendarWithEventsState,changeToActiveEvent(events[0]));
    expect(state).toEqual(calendarWithEventsActiveState);
  })

  test('on add new event',()=>{
    const newEvent = {
      id: '3',
      title: 'Cumpleaños Juan',
      notes:'Some notes test 3',
      start: new Date('2021-11-01 13:00:00'),
      end: new Date('2021-11-01 14:00:00'),
    }
    const state = calendarSlice.reducer(calendarWithEventsState,onAddNewEvent(newEvent));
    const calendarcalendarWithEventsStateWithAdd={
      ...calendarWithEventsState,
      events:[
      ...events,
      newEvent
    ]
    }

    expect(state).toEqual(calendarcalendarWithEventsStateWithAdd);
  })


  test('on update event',()=>{
    const newEventUpdate = {
      id: '1',
      title: 'Cumpleaños Andres Duque',
      notes:'Some notes test 1',
      start: new Date('2021-09-01 13:00:00'),
      end: new Date('2021-09-01 14:00:00'),
    }

    const state = calendarSlice.reducer(calendarWithEventsState,onUpdateEvent(newEventUpdate));
    expect(state.events[0]).toEqual(newEventUpdate);

  })

  test('on delete event',()=>{
    const state = calendarSlice.reducer(calendarWithEventsActiveState,onRemoveEvent());
    expect(state.events).not.toContain(events[0]);
    expect(state.activeEvent).toBeNull();
  })
  test('on Logout calendar',()=>{
    const state = calendarSlice.reducer(calendarWithEventsState,onLogoutCalendar());
    expect(state).toEqual(initialState);
  })
});