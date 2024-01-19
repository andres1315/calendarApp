import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "../../src/store/auth/authSlice"
import { act, renderHook } from "@testing-library/react"

import { useAuthStore } from "../../src/hooks/useAuthStore"
import { Provider } from "react-redux"

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
    localStorage.clear()
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
    localStorage.clear()
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
        email:'andre2323232323221231231s@dukedev.com',
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
    const {startRegister} = result.current
    await act(async ()=>{
      const user = {
        email:'andrestestte1s2222t1@dukedev.com',
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
  })
})