import { renderHook } from "@testing-library/react"
import { useUiStore } from "../../src/hooks/useUiStore"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { uiReducer } from "../../src/store/ui/uiSlice"
import { act } from "react-dom/test-utils"


const getMockStore = (initialState)=>{
  return  configureStore({
    reducer: {
      ui: uiReducer
    },
    preloadedState: {
      ui: {
       ...initialState
      }
    }
  
  })
}

describe('Pruebas en useUiStore',()=>{
  test('debe de retornar el estado inicial',()=>{
    const mockStore = getMockStore({isDateModalOpen: false})
    const {result} = renderHook(()=>useUiStore(),{
      wrapper: ({children})=>(<Provider store={mockStore}>{children}</Provider>)
    })
    expect(result.current.isDateModalOpen).toBe(false)
       expect(result.current).toEqual({
        isDateModalOpen: false,
        onOpenModal: expect.any(Function),
        onCloseModal: expect.any(Function)
      })
  
  })


  test('openDateModal debe de cambiar el estado a true',()=>{
    const mockStore = getMockStore({isDateModalOpen: false})
    const {result} = renderHook(()=>useUiStore(),{
      wrapper: ({children})=>(<Provider store={mockStore}>{children}</Provider>)
    })

    const {onOpenModal } = result.current

    act(()=>{
      onOpenModal()
    })
    expect(result.current.isDateModalOpen).toBe(true)
  })

  test('closeDateModal debe de cambiar el estado a false',()=>{
    const mockStore =  getMockStore({isDateModalOpen: true})
    const {result} = renderHook(()=>useUiStore(),{ 
      wrapper: ({children})=>(<Provider store={mockStore}>{children}</Provider>)
    })
    
    const {onCloseModal } = result.current
    act(()=>{
      onCloseModal()
    })

    expect(result.current.isDateModalOpen).toBe(false)

  })
})