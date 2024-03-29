import { useCalendar } from "../../hooks";

export const FabDelete = () => {
  const { deleteEvent, hasEventSelected } = useCalendar();

  const handleDelete = () => {
    deleteEvent();
  };

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
      style={{ display: hasEventSelected ? '' : 'none' }}
    >
      <i className="fa fa-trash-alt"></i>
    </button>
  );
};
