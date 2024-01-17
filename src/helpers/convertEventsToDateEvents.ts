import { parseISO } from "date-fns";

export const convertEventsToDateEvents = (events) => {
    return events.map((event) => {
        return {
            ...event,
            end: parseISO(event.end),
            start: parseISO(event.start),
        };
    });
}