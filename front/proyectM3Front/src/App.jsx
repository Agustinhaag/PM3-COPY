import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import "./App.css";
import MisTurnos from "./views/MisTurnos";
import Navbar from "./components/Navbar";
import Register from "./views/Register";
import Login from "./views/Login";
import ProtectedRoutes from "./middlewares/protectedRoute";
import Footer from "./components/Footer";
import Contact from "./views/Contact";
import NotFound from "./views/NotFound";
import Profile from "./views/Profile";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/appointments" element={<MisTurnos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
