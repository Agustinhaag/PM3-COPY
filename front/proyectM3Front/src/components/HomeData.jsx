import React from "react";

const HomeData = () => {
  return (
    <section className="flex md:flex-row md:gap-0 gap-4 flex-col md:w-full w-5/6 mx-auto mb-10">
      <div className="data md:w-1/3 w-full pl-6 pr-1 py-4 bg-zinc-700 text-left flex flex-col text-white gap-4">
        <p>
          <i className="fa-solid fa-location-dot"></i>
          Sucursales en todo el país
        </p>
        <p>
          <i className="fa-solid fa-money-bill-1-wave"></i>
          Cajeros automáticos de ultima generación
        </p>
        <p>
          <i className="fa-solid fa-house-laptop"></i>
          Un homeBanking 100% virtual y con asistencia las 24 horas
        </p>
        <p>
          <i className="fa-solid fa-mobile"></i> Una App gratuita AH+
        </p>
        <p>
          <i className="fa-solid fa-earth-americas"></i>
          Presencia en mas de 9 paises de america
        </p>
      </div>
      <div className="md:w-2/3 w-full pl-3">
        <h3 className="text-left text-2xl font-medium">
          Home banking y nuestra App
        </h3>
        <p className="text-left my-1 ">
          Realiza todo tipo de operaciones sin moverte de tu casa y todo desde
          el alcamce de tu smartphone o tablet
        </p>
        <ul className="text-left ml-10 flex flex-col gap-1 list-disc ">
          <li>Mi token</li>
          <li>Consultas sobre transferencias</li>
          <li>Cambiar la clave del cajero automático</li>
          <li>Sucursales mas cercanas</li>
          <li>Solicitar prestamos en el acto</li>
          <li>Solicitud o reposición de tarjeta de débito o crédito</li>
          <li>Operaciones disponibles las 24 horas</li>
          <li>Centro de asistencia guiada por nuestro servicio de AC</li>
          <li>Requisitos para operar</li>
        </ul>
      </div>
    </section>
  );
};

export default HomeData;
