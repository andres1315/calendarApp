import {onCloseDateModal, onOpenDateModal, uiSlice} from '../../../src/store/ui/uiSlice'
describe('pruebas en uiSlice', () => { 
  test('debe de tener el estado inicial', () => {
    expect(uiSlice.getInitialState().isDateModalOpen).toBe(false);
  })

  test('debe de abrir el modal y cerrarw', () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy();


    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy();
    
  })
})