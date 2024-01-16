import { FormEvent, useEffect, useState } from "react";
import { differenceInSeconds,  } from "date-fns";
import DatePicker,{registerLocale} from "react-datepicker";
import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";
import es  from 'date-fns/locale/es'
import Swal from "sweetalert2";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";

registerLocale('es', es)

const customStyles = {
  content: {
    top: "50%",
    left: "50%",



  },
};
Modal.setAppElement("#root");
export const CalendarModal = () => {
  const {activeEvent, startSavingEvent } = useCalendarStore()

  
  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: "",
    end: "",
  });

  const {isDateModalOpen, onCloseModal} = useUiStore()



  const onDateChange = (date: Date, changing:string) => {
    setFormValues({
      ...formValues,
      [changing]:date
    })
  }

  const onInputChange = ({ target }: { target: HTMLInputElement }) => {
    setFormValues({
      ...formValues,
      [target.name]:target.value
    })
  }

  const onSubmit=async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const differenceDate = differenceInSeconds(formValues.end,formValues.start)
    if(isNaN(differenceDate) || differenceDate <=0) return Swal.fire('Error','La fecha de fin debe ser mayor a la de inicio','error')
    if (formValues.title.length === 0) return Swal.fire('Error','El titulo es obligatorio','error')
    console.log(formValues)
    await startSavingEvent(formValues)
    onCloseModal()
  }

  useEffect(()=>{
    if (activeEvent !== null){
      setFormValues(activeEvent)
    }
  },[activeEvent])
  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1 className="font-bold text-3xl text-blue-500 mb-3"> Nuevo evento </h1>
      <hr />
      <form className="grid grid-cols-3 gap-2 " onSubmit={onSubmit}>
        <div className="col-span-3 flex flex-col mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker selected={formValues.start} onChange={(date: Date) => onDateChange(date,'start')} dateFormat='Pp'  showTimeSelect  locale='es'  timeCaption='Hora'/>
        </div>

        <div className="col-span-3 flex flex-col mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker selected={formValues.end} onChange={(date: Date) => onDateChange(date,'end')} dateFormat='Pp' minDate={formValues.start} showTimeSelect locale='es' timeCaption='Hora' />
        </div>

        
        <div className="col-span-3 flex flex-col mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="border border-gray-200 rounded px-2 outline-blue-500"
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="col-span-3 flex flex-col mb-2">
          <textarea
            type="text"
            className="border border-gray-200 rounded px-2 outline-blue-500"
            placeholder="Notas"
            rows={5}
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 hover:shadow-md text-white font-semibold rounded-lg p-2 col-span-3 items-center ">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
