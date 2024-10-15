import { useDispatch, useSelector } from "react-redux";
import { handleCancel, handleDelete } from "../helpers/swalFunctions";
import {
  deleteAppointment,
  cancelAppointment,
  fetchUserData,
} from "../redux/appointmentSlice";

const Appointment = ({ turn }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const cancelTurn = async () => {
    const res = dispatch(cancelAppointment(turn.id));
    if (res.requestId) {
      dispatch(fetchUserData(user.user.id));
    }
  };

  const deleteTurn = async () => {
    const res = dispatch(deleteAppointment(turn.id));
    if (res.requestId) {
      dispatch(fetchUserData(user.user.id));
    }
  };

  return (
    <div className="appointments border-2 border-zinc-300 rounded-xl md:py-2 py-3 px-3 flex flex-col md:flex-row mb-5 justify-between items-center md:gap-2 gap-4 md:w-full w-9/12 min-w-80">
      <p className="font-semibold text-lg md:w-2/12 md:text-left w-2/4">
        Fecha: <span className="font-normal text-sm">{turn.date}</span>
      </p>
      <p className="font-semibold text-lg md:w-2/12 md:text-left w-2/4">
        Horario: <span className="font-normal text-sm">{turn.time}</span>
      </p>

      <span
        className={`w-20 font-medium ${
          turn.status ? "text-lime-400" : "text-red-500"
        }`}
      >
        {turn.status ? "ACTIVO" : "CANCELADO"}
      </span>

      <span className="w-1/3">{turn.description}</span>
      <div className="flex md:w-1/5 gap-2">
        <button
          onClick={() => handleCancel(cancelTurn,turn)}
          disabled={turn.status === false}
          className="cancel bg-none rounded-3xl py-2 md:px-0 px-2 w-20 hover:text-white hover:cursor-pointer"
        >
          Cancelar
        </button>
        <button
          disabled={turn.status === true}
          className="bg-none text-red-600 border border-red-600 rounded-3xl py-2 px-3 w-11 hover:cursor-pointer hover:text-white hover:bg-red-600"
          onClick={() => handleDelete(deleteTurn)}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default Appointment;
