import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";

import { useCalendarStore } from "../../../src/hooks/useCalendarStore";

jest.mock('../../../src/hooks/useCalendarStore')

describe("Pruebas en <FabDelete />", () => {
  const mockDeleteEvent = jest.fn()
  beforeEach(() => {
    jest.clearAllMocks()
  });
  test("debe de mostrar el componente correctamente", () => {
    useCalendarStore.mockReturnValue({
      deleteEvent:()=>{}
    })
    render(<FabDelete />);
    const btn =  screen.getByLabelText('btnDelete')
    expect(btn.classList).toContain('bg-red-500');
    expect(btn.classList).toContain('text-white');
    expect(btn.classList).toContain('font-bold');
    screen.debug()
  });



  test("debe de llamar la funcion", () => {
    useCalendarStore.mockReturnValue({
      deleteEvent:mockDeleteEvent
    })
    render(<FabDelete />);
    const btn =  screen.getByLabelText('btnDelete')
    fireEvent.click(btn)
    expect(mockDeleteEvent).toHaveBeenCalled()
    screen.debug()
  });
});
