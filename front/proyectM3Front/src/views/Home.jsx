import { useSelector } from "react-redux";
import HomeData from "../components/HomeData";
import Info from "../components/Info";
import About from "../components/About";

const Home = () => {
  const user = useSelector((state) => state.user);
  return (
    <main>
      <section className="main">
        <img src="/banner2.jpg" className="h-56 w-full" alt="" />
        <div>
          <h1 className="text-3xl my-3">
            Hola! <span className="italic capitalize">{user.user.name}</span>,
            bienvenido a Bank AH
          </h1>
          <p className="text-2xl text-zinc-600 mb-9">
            Somos el banco mas elegido en Argentina y top número 5 en america
            del sur!
          </p>
        </div>
        <HomeData />
       <About/>

        <Info />
      </section>
    </main>
  );
};

export default Home;