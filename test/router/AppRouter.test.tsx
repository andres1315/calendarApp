import { render, screen } from "@testing-library/react"
import { AppRouter } from "../../src/router/AppRouter"
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { be } from "date-fns/locale"
import { MemoryRouter } from "react-router-dom"
import { CalendarPage } from "../../src/calendar/pages/CalendarPage"
jest.mock('../../src/hooks/useAuthStore')
jest.mock('../../src/calendar/pages/CalendarPage',()=>(
  {
    CalendarPage: () => <div>CalendarPage</div>
  }
))
describe('pruebas en AppRouter', () => {

  const checkAuthToken = jest.fn()
  beforeEach(() => jest.clearAllMocks())
  test('debe de mostrar el mensaje "Checking..."', () => {
    useAuthStore.mockReturnValue({
      status: 'checking',
      checkToken: checkAuthToken
    })
    render(<AppRouter />)
    const text = screen.getByText('Checking...')
    expect(text).toBeTruthy()
    expect(checkAuthToken).toHaveBeenCalled()


  })
  
  test('debe de mostrar el componente <CalendarPage />', () => {
    useAuthStore.mockReturnValue({
      status: 'authenticated',
      checkToken: checkAuthToken
    })

    render(
    <MemoryRouter >
        <AppRouter />
    </MemoryRouter>)
    expect(screen.getByText('CalendarPage')).toBeTruthy()
    screen.debug()
  })
  
  test('debe de mostrar el componente <LoginPage />', () => {
    useAuthStore.mockReturnValue({
      status: 'not-authenticated',
      checkToken: checkAuthToken
    })

    const {container} = render(<MemoryRouter>
        <AppRouter />
    </MemoryRouter>)
    expect(screen.getByText('Login')).toBeTruthy()
    expect(container).toMatchSnapshot()
  })
})