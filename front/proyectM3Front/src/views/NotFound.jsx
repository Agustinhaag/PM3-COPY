import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    if (count === 0) {
      navigate("/");
    }
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <main className="flex md:pt-0 pt-24 md:flex-row flex-col w-full h-full bg-gray-300 items-center justify-between px-5">
      <div className="flex flex-col justify-center w-full md:w-1/3 items-center min">
        <h1 className="font-semibold text-7xl md:text-8xl mb-4">Oops!</h1>
        <p className="text-2xl mb-3">
          <span className="text-red-600 font-bold text-2xl">404</span> - Page
          not found
        </p>
        <p className="text-lg">
          Sera redirijido/a al home en {count} segundos.
        </p>
      </div>
      <div className="w-2/3 min-w-64 flex justify-end">
        <img src="/404.png" alt="" />
      </div>
    </main>
  );
};

export default NotFound;
