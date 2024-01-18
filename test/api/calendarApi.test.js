import {calendarApi} from '../../src/api/calendarApi';
describe('Pruenba de la api de calendario', () => {
  test('debe tener la configuraciom por defecto',()=>{
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
  })

  test('Debe de tener el x-token del header de la peticion',async()=>{
    const token = 'ABC123ABC123';
    localStorage.setItem('token',token);
    const res = await calendarApi.get('/auth');
    expect(res.config.headers['x-token']).toBe(token);
  })
});