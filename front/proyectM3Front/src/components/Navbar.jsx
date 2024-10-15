import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "../redux/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const menu = document.getElementById("menu");
    const mostrar = document.getElementById("mostrar");
    const cerrar = document.getElementById("cerrar");
    const enlaces = document.querySelectorAll(".enlaces");

    mostrar &&
      mostrar.addEventListener("click", () => {
        menu.classList.add("visible");
        menu.style.transition = "0.6s";
      });

    cerrar &&
      cerrar.addEventListener("click", () => {
        menu.classList.remove("visible");
      });

    enlaces &&
      enlaces.forEach((enlace) => {
        enlace.addEventListener("click", () => {
          menu.classList.remove("visible");
        });
      });
  }, [user]);

  return (
    <header className="flex justify-between items-center fixed w-full py-5 px-7 bg-zinc-700">
      <div className="container-head italic text-3xl">| AH |</div>
      {user && Object.keys(user).length !== 0 ? (
        <>
          <nav
            id="menu"
            className="flex flex-col rounded-bl-2xl md:visible invisible md:flex-row justify-start fixed md:relative bg-zinc-700 top-0 right-0 text-right md:justify-between md:w-1/3 w-1/4 min-w-36 md:min-w-80 items-end z-50 md:py-0 md:px-0 px-5 pt-14 translate-x-full md:translate-x-0 h-3/4 md:h-6"
          >
            <Link to="/" className="enlaces">
              HOME
            </Link>
            <Link to="/profile" className="enlaces">
              MI PERFIL
            </Link>
            <Link to="/appointments" className="enlaces">
              MIS TURNOS
            </Link>
            <Link to="/contact" className="enlaces">
              CONTACTO
            </Link>
            <Link
              className="text-neutral-100 text-2xl py-2 px-3 border md:hidden w-full border-neutral-100 rounded-[60px] "
              onClick={handleLogout}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </Link>
            <span
              id="cerrar"
              className="close md:hidden text-white block cursor-pointer text-lg absolute right-5 top-5"
            >
              <i className="fa-solid fa-x"></i>
            </span>
          </nav>

          <span
            id="mostrar"
            className="hamb  md:hidden text-white block cursor-pointer text-lg relative right-1 order-1"
          >
            <i className="fa-solid fa-bars"></i>
          </span>
          <div className="contUser flex">
            <Link
              className="text-neutral-100 text-2xl py-2 px-3 border border-neutral-100 rounded-[60px] "
              onClick={handleLogout}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </Link>
          </div>
        </>
      ) : (
        <div className="contUserLoguin">
          <Link
            to="/register"
            className="text-neutral-100 text-2xl py-2 px-3 border border-neutral-100 rounded-[60px]"
          >
            <i className="fa-solid fa-user"></i>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
