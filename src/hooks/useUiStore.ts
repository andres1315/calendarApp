import { useAppDispatch, useAppSelector } from "../store/hooks"
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice"

export const useUiStore = () => {
  const {isDateModalOpen} = useAppSelector(state => state.ui)
  const dispatch = useAppDispatch()


  const onOpenModal = () => {
    dispatch(onOpenDateModal())
  }

  const onCloseModal = () => {
    dispatch(onCloseDateModal())
  } 

  return {
    //* props
    isDateModalOpen,
    //* methods
    onOpenModal,
    onCloseModal
  }
}