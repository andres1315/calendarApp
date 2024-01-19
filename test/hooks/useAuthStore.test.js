import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "../../src/store/auth/authSlice"
import { act, renderHook, waitFor } from "@testing-library/react"

import { useAuthStore } from "../../src/hooks/useAuthStore"
import { Provider } from "react-redux"
import { calendarApi } from "../../src/api/calendarApi"

const getMockStore = (initialState)=>{
  return configureStore({
    reducer:{
      auth:authReducer
    },
    preloadedState:{
      auth:{
        ...initialState
      }
    }
  })
}

describe('Pruebas en useAuthStore',()=>{

  beforeEach(()=> localStorage.clear())

  test('test initialState',()=>{
    const mockStore = getMockStore({status:'checking', // 'checking' | 'authenticated' | 'not-authenticated
    token: "",
    user: {},
    errorMessage: ""})

    const {result} = renderHook(()=>useAuthStore(),{
      wrapper:({children})=>(<Provider store={mockStore}>{children}</Provider>)
    })
    expect(result.current).toEqual({
      user: {},
      status: 'checking',
      errorMessage: '',
      startLogin: expect.any(Function),
      startRegister:expect.any(Function),
      checkToken: expect.any(Function),
      startLogout: expect.any(Function),
    })
 
  })


  test('test startLogin',async ()=>{
    const mockStore = getMockStore({
      status : 'not-authenticated',
      token: '',
      user: {},
      errorMessage: ''
    })

    const { result} =  renderHook(()=>useAuthStore(),{
      wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
    })

    const {startLogin} = result.current

    
    await act(async()=>{
      
      await startLogin({
        email:'andres@dukedev.com',
        password:'123321'
      })
    })

    const {status,errorMessage,user} = result.current

    expect({status,errorMessage,user}).toEqual({
      status: 'authenticated',
      user:{ uid: expect.any(String), name: expect.any(String) },
      errorMessage: ''
    })


    expect(localStorage.getItem('token')).toEqual(expect.any(String))

  })

  test('test startLogin user y contraseña incorrectos',async ()=>{
    const mockStore = getMockStore({
      status : 'not-authenticated',
      token: '',
      user: {},
      errorMessage: ''
    })

    const { result} =  renderHook(()=>useAuthStore(),{
      wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
    })

    const {startLogin} = result.current

    
    await act(async()=>{
      
      await startLogin({
        email:'andre232323232322221231231s@dukedev.com',
        password:'123321'
      })
    })

    const {status,errorMessage,user} = result.current

    expect({status,errorMessage,user}).toEqual({
      status: 'not-authenticated',
      user:{},
      errorMessage: expect.any(String)
    })


    expect(localStorage.getItem('token')).toBe(null)

    await waitFor(()=>{
      expect(result.current.errorMessage).toBe('')
    })

  })


  test('test startRegister',async ()=>{
    const mockStore = getMockStore({
      status : 'not-authenticated',
      token: '',
      user: {},
      errorMessage: ''
    })
    const {result} =  renderHook(()=>useAuthStore(),{
      wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
    })

    const spy = jest.spyOn(calendarApi,'post').mockReturnValue({
      data:{
        "ok": true,
        "msg": "register",
        "uid": "65aabedbfcecf3232329cfddc24e",
        "name": "andres duque",
        "token": "anyt-token"
      }
    })
    const {startRegister} = result.current
    await act(async ()=>{
      const user = {
        email:'andreste2s2tte1s22222t1@dukedev.com',
        password:'123321',
        name:'andres test'
      }
      await startRegister(user)
    })
    expect(result.current).toEqual({
      user:{ uid: expect.any(String), nameUser: expect.any(String) },
      status: 'authenticated',
      errorMessage: '',
      startLogin: expect.any(Function),
      startRegister:expect.any(Function),
      checkToken: expect.any(Function),
      startLogout: expect.any(Function),
    
    })

    spy.mockRestore()
  })
})