import { authSlice, clearError, onLogin, onLogout } from '../../../src/store/auth/authSlice';
const authenticatedState ={
  status: 'authenticated',
  errorMessage: '',
  user: {
    uid: '123456',
    name: 'Andres',
  },
  token: '123322223',
}
const initialState ={
  status: 'checking',
  errorMessage: '',
  user: {},
  token: ""
}


const notAuthenticatedState = {
  status: 'not-authenticated',
  errorMessage: 'Exit to app',
  user: {},
  token: ''

}

describe('Tests authSlice',()=>{
  test('Debe de tener el estado inicial',()=>{
    let state = authSlice.getInitialState();
    expect(state).toEqual(initialState)
  })


  test('Debe de hacer el login y actualizar estado',()=>{

    const payload = {
      token:'123322223',
      user:{
        uid:'123456',
        name:'Andres'
      }
    }
    const state = authSlice.reducer(authenticatedState, onLogin(payload));
    expect(state).toEqual(authenticatedState)

    
    
  })


  test('logout y actualizar estado',()=>{
    const state = authSlice.reducer(notAuthenticatedState, onLogout({errorMessage:'Exit to app'}));
    expect(state).toEqual(notAuthenticatedState)
  })


  test('Debe limpiar el mensaje de error',()=>{
    const state = authSlice.reducer(notAuthenticatedState, clearError());
    expect(state.errorMessage).toBe('')
  })
  
})