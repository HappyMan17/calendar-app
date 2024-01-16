import { addHours, differenceInSeconds } from "date-fns";
import { useState, useMemo, useEffect } from "react";
import Modal from "react-modal";

import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";

import Swal from "sweetalert2";
// import 'sweetalert2/src/sweetalert2.scss';
import 'sweetalert2/dist/sweetalert2.min.css';

import { useCalendar, useUiStore } from "../../hooks";

type DateToChange = 'start' | 'end';

registerLocale('es', es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    // backgroundColor: 'white',
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendar();
  const [formSubmited, setFormSubmited] = useState(false);

  // Form control
  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  //* styles for error
  const titleClass = useMemo(() => {
    if (!formSubmited) return '';
    return (formValues.title.length <= 0)
      && 'is-invalid';
  }, [formValues.title, formSubmited]);

  //* Setting init values
  useEffect(() => {
    if (!activeEvent) {
      return;
    }
    setFormValues({ ...activeEvent });
  }, [activeEvent]);

  const onInputChange = ({ target }: any) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChange = (newDate: any, changing: DateToChange) => {
    setFormValues({
      ...formValues,
      [changing]: newDate,
    });
  };
  //

  const onSubmit = async(event: any) => {
    event.preventDefault();
    setFormSubmited(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(difference) || difference <= 0) {
      // title, message and icon
      Swal.fire('Wrong dates', 'Please check the choosen dates', 'error');
      return;
    }
    if (formValues.title.length <= 0) return;

    //todo remove screen errors
    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmited(false);
  };

  return (
    <div>
      <Modal
        isOpen={isDateModalOpen}
        onRequestClose={closeDateModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={onSubmit}>
          <div className="form-group mb-2">
            <label>Fecha y hora inicio</label>
            <br />
            <DatePicker
              selected={formValues.start}
              onChange={(date) => onDateChange(date, 'start')}
              className="form-control picker"
              dateFormat="Pp"
              showTimeSelect={true}
              locale="es"
              timeCaption="Hora"
            />
          </div>

          <div className="form-group mb-2">
            <label>Fecha y hora fin</label>
            <br />
            <DatePicker
              className="form-control picker"
              minDate={formValues.start}
              selected={formValues.end}
              onChange={(date) => onDateChange(date, 'end')}
              dateFormat="Pp"
              showTimeSelect={true}
              locale="es"
              timeCaption="Hora"
            />
          </div>

          <hr />
          <div className="form-group mb-2">
            <label>Titulo y notas</label>
            <input
              type="text"
              className={`form-control ${titleClass}`}
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

          <div className="form-group mb-2">
            <textarea
              // type="text"
              className="form-control"
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

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </div>
  );
};
