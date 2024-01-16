import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  isDateModalOpen: boolean
}

const initialState: UiState = {
  isDateModalOpen: false

}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    onOpenDateModal: (state) => {
      state.isDateModalOpen = true
    },
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false
    }
  }
})

export const {onOpenDateModal,onCloseDateModal} = uiSlice.actions
export const uiReducer = uiSlice.reducer