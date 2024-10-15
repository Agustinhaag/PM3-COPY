import React from "react";
import { Link } from "react-router-dom";

const Info = () => {
  return (
    <section className=" border-t  py-2 border-zinc-400">
      <div className="flex md:flex-row flex-col md:gap-1 gap-5 w-2/3 mx-auto justify-around py-3 ">
        <Link to="/contact">
          <span className="icon font-extrabold">@</span>Contactenos
        </Link>
        <div className="flex flex-col">
          <p>
            <i className="fa-solid fa-phone icon"></i>Centro de Atención al
            cliente
          </p>
          <p>0800 111 1111</p>
        </div>
        <p>
          <i className="fa-solid fa-location-dot icon"></i>Sucursales y cajeros
        </p>
      </div>
    </section>
  );
};

export default Info;
