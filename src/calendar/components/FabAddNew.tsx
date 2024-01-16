import { add, addHours } from "date-fns";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore";

export const FabAddNew = ({children, className}:{children:JSX.Element, className?:string}) => {
  const {onOpenModal} = useUiStore()
  const {setActieEvent} = useCalendarStore()
  const handleClickNew=()=>{
    setActieEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(),1),
      bgColor: "#347cf7",
      user: {
        _id: "123",
        name: "Dque",
      },
    })
    onOpenModal()
  }
  return (
    <div className="fixed bottom-4 right-4">
      <button className={`bg-blue-500 hover:bg-blue-600 text-white font-bold  p-4 rounded-full shadow-lg ${className}`}  onClick={handleClickNew}>
        {children}
      </button>
    </div>
  );
};
