import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user);
  return (
    <main className="login bg-cover">
      <section className="main">
        <h2 className="text-3xl underline-offset-2 text-white my-6">
          Mi Perfil
        </h2>
        {user ? (
          <div className="my-3 w-2/5 mx-auto bg-zinc-300 py-5 rounded-3xl min-w-80">
            <img
              src={user.user.profileImg || "/default.jpg"}
              alt={user.user.name}
              className="w-64 mx-auto rounded-full h-60"
            />
            <div className="flex flex-col gap-3 w-4/5 mx-auto mt-4 items-start">
              <div className="flex justify-between text-left text-lg">
                <span className="font-bold mr-1.5 ">Id de usuario:</span>
                {user.user.id}
              </div>
              <div className="flex justify-between  text-left text-lg">
                <span className="font-bold mr-1.5 ">Nombre: </span>
                {user.user.name}
              </div>
              <div className="flex justify-between text-left text-lg">
                <span className="font-bold mr-1.5 ">Email: </span>{" "}
                {user.user.email}
              </div>
              <div className="flex justify-between text-left text-lg">
                <span className="font-bold mr-1.5 ">Dni: </span> {user.user.dni}
              </div>
              <div className="flex justify-between text-left text-lg">
                <span className="font-bold mr-1.5 ">Nacimiento:</span>
                {user.user.birthdate}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="flex justify-center py-4">
          <Link
            className="btn-Profile font-semibold bg-none rounded-3xl md:text-base md:py-2 md:px-5 hover:cursor-pointer text-sm py-1.5 px-4"
            to="/"
          >
            Regresar
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Profile;
