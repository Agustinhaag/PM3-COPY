import React from 'react'

const About = () => {
  return (
    <section className="flex flex-col my-5 w-full px-2 mx-auto text-left gap-7">
    <div className="history">
      <h2 className="mb-2 text-xl">Nuestra Historia</h2>
      <p>
        Fundado en 19XX, BancoNombre ha estado sirviendo a comunidades por
        más de XX años. Desde nuestros humildes comienzos como una
        institución de ahorro local, hemos crecido para convertirnos en un
        socio financiero de confianza para individuos y empresas por
        igual.
      </p>
    </div>
    <div className="mission">
      <h2 className="mb-2 text-xl">Nuestra Misión</h2>
      <p>
        En BancoNombre, nuestra misión es empoderar a nuestros clientes
        para que alcancen sus metas y sueños financieros. Estamos
        comprometidos a proporcionar soluciones financieras innovadoras,
        servicio excepcional y fomentar relaciones a largo plazo basadas
        en la confianza y la integridad.
      </p>
    </div>
    <div className="values">
      <h2 className="mb-2 text-xl">Nuestros Valores</h2>
      <ul className="flex flex-col gap-2">
        <li>
          <span className="font-semibold"> Satisfacción del Cliente</span>
          : Priorizamos las necesidades y la satisfacción de nuestros
          clientes por encima de todo.
        </li>
        <li>
          <span className="font-semibold">Integridad</span>: Realizamos
          negocios con honestidad, transparencia y responsabilidad.
        </li>
        <li>
          <span className="font-semibold">Innovación</span>: Nos
          esforzamos continuamente por innovar y mejorar nuestros
          productos y servicios para servir mejor a nuestros clientes.
        </li>
        <li>
          <span className="font-semibold">
            Compromiso con la Comunidad
          </span>
          : Estamos dedicados a devolver a las comunidades a las que
          servimos a través de la filantropía y la participación
          comunitaria.
        </li>
      </ul>
    </div>
  </section>
  )
}

export default About