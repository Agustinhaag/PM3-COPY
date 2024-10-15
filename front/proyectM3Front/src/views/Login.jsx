import { Formik, Field, Form, ErrorMessage } from "formik";
import { validarLogin } from "../helpers/validate";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import "../styles/forms.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";

const Login = () => {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  return (
    <main className="login main bg-cover pb-4">
      <section className="cont-login w-5/12 mx-auto py-2 mt-2 rounded-xl min-w-48">
        <h2 className="text-center md:my-4 mx-0 md:text-3xl underline-offset-4 text-2xl my-5">
          Inicio de sesión
        </h2>
        <div className="cont-form w-4/5 mx-auto mb-4">
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validate={validarLogin}
            onSubmit={(values) => {
              axios
                .post("http://localhost:4000/users/login", values)
                .then((res) => dispatch(login(res.data)))
                .then((res) => {
                  swal({
                    title: "Inicio de sesión exitoso!",
                    text: "Haz ingresado sesión correctamente!",
                    icon: "success",
                    button: "OK!",
                  });
                  redirect("/");
                })
                .catch((error) => {
                  setError(error.response.data.error);
                });
            }}
          >
            {(formikProps) => (
              <Form className="flex flex-col gap-4 items-start">
                <div className="cont-input">
                  <label htmlFor="username">Email:</label>
                  <Field
                    type="email"
                    name="username"
                    placeholder="example@gmail.com"
                    className={
                      (formikProps.errors.username &&
                        formikProps.touched.username) ||
                      error
                        ? "error"
                        : ""
                    }
                  />
                  <span style={{ color: "red" }}>
                    <ErrorMessage name="username" />
                  </span>
                </div>
                <div className="cont-input">
                  <label htmlFor="password">Contraseña:</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="*********"
                    className={
                      (formikProps.errors.password &&
                        formikProps.touched.password) ||
                      error
                        ? "error"
                        : ""
                    }
                  />
                  <span style={{ color: "red" }}>
                    <ErrorMessage name="password" />
                  </span>
                </div>

                {error && <p className="text-red-600">¡{error}!</p>}

                <div className="cont-btn flex w-full justify-center mb-5">
                  <button
                    type="submit"
                    className="font-bold bg-none rounded-3xl md:text-base md:py-2 md:px-5 hover:cursor-pointer text-sm py-1.5 px-4"
                  >
                    Iniciar sesión
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <p>
            ¿Aún no tienes una cuenta?{" "}
            <Link to="/register" className="no-underline">
              Registrarse
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;