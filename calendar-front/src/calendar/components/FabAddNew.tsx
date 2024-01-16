import { addHours } from "date-fns";
import { useCalendar, useUiStore } from "../../hooks";

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendar();

  const handleClickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "",
      user: {
        _id: '',
        name: 'Sebastian',
      }
    });
    openDateModal();
  };

  return (
    <button
      className="btn btn-primary fab"
      onClick={handleClickNew}
    >
      <i className="fa fa-plus"></i>
    </button>
  );
};
