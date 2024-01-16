import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore";

export const FabDelete = ({children, className}:{children:JSX.Element, className?:string}) => {
  const {onOpenModal} = useUiStore()
  const {deleteEvent} = useCalendarStore()

  const handleClickDelete=()=>{
    deleteEvent()
  }
  return (
    <div className="fixed bottom-4 left-4">
      <button className={`bg-red-500 hover:bg-red-600 text-white font-bold  p-4 rounded-full shadow-lg ${className}`}  onClick={handleClickDelete}>
        {children}
      </button>
    </div>
  );
};
