import { useEffect } from "react";
import Appointment from "../components/Appointment";
import "../styles/appointments.css";
import { useSelector, useDispatch } from "react-redux";
import CreateAppointment from "../components/CreateAppointments";
import Info from "../components/Info";
import { fetchUserData } from "../redux/appointmentSlice";
import { useNavigate } from "react-router-dom";

const MisTurnos = () => {
  const user = useSelector((state) => state.user);
  const turns = useSelector((state) => state.userAppointments);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(fetchUserData(user.user.id));
    }
  }, [navigate, user, dispatch]);

  return (
    <main className="turns-bg">
      <section className="main">
        <h2 className="text-2xl underline-offset-2 mt-3 mb-5"> Mis turnos</h2>
        <CreateAppointment />
        <div className="border-t border-zinc-400 mt-3"></div>
        <div className="flex flex-col my-5 mx-auto w-5/6 items-center">
          {turns.length === 0 || !turns ? (
            <p className="text-lg">No posee turnos agendados.</p>
          ) : (
            turns.map((turn) => {
              return <Appointment turn={turn} key={turn.id} />;
            })
          )}
        </div>
        <Info />
      </section>
    </main>
  );
};

export default MisTurnos;