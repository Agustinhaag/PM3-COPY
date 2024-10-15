import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-zinc-700 w-full h-40">
      <div className="flex w-11/12 mx-auto justify-between h-4/5 pt-3">
        <div className="container-footer italic text-5xl">| AH |</div>
        <div className="flex flex-col justify-between items-center">
          <Link to="https://www.instagram.com/agushaag22/" className="text-2xl">
            <i className="fa-brands fa-instagram text-red-600"></i>
          </Link>
          <Link
            to="https://www.linkedin.com/in/agustin-gerardo-haag-letterucci-8a6546225/"
            className="text-2xl"
          >
            <i className="fa-brands fa-linkedin text-blue-600"></i>
          </Link>
          <Link to="mailto:agustin-haag@hotmail.com" className="text-2xl">
            <i className="fa-solid fa-envelope text-cyan-600"></i>
          </Link>
        </div>
      </div>
      <p className="text-center text-white">
        &copy;All rights reserved - 2024
      </p>
    </footer>
  );
};

export default Footer;
