import { Formik, Field, Form, ErrorMessage } from "formik";
import { validarRegister } from "../helpers/validate";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useState } from "react";
import "../styles/forms.css";

const Register = () => {
  const [error, setError] = useState(null);
  const redirect = useNavigate();
  return (
    <main className="login main bg-cover pb-4">
      <section className="cont-login w-1/2 mx-auto py-2 mt-2 min-w-72 rounded-xl">
        <h1 className="my-3 md:text-3xl text-2xl italic">
          Bienvenido a Bank AH, tu banco de confianza!
        </h1>
        <h2 className="text-center md:my-4 mx-0  underline-offset-4 text-2xl my-5">
          Registrar usuario
        </h2>
        <div className="cont-form w-3/5 mx-auto mb-4">
          <Formik
            initialValues={{
              name: "",
              email: "",
              dni: "",
              birthdate: "",
              password: "",
              profileImg: "",
            }}
            validate={validarRegister}
            onSubmit={(values) => {
              const formData = new FormData();
              formData.append("name", values.name);
              formData.append("email", values.email);
              formData.append("dni", values.dni);
              formData.append("birthdate", values.birthdate);
              formData.append("password", values.password);
              formData.append("profileImg", values.profileImg);
              axios
                .post("http://localhost:4000/users/register", values, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((res) => {
                  swal({
                    title: "Registro exitoso!",
                    text: "Haz completado el registro correctamente!",
                    icon: "success",
                    button: "OK!",
                  });
                  redirect("/login");
                })
                .catch((error) => {
                  setError(error.response.data.error);
                });
            }}
          >
            {(formikProps) => (
              <Form className="flex flex-col gap-4 items-start">
                <div className="cont-input">
                  <label htmlFor="name">Nombre completo:</label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="hola123"
                    className={
                      (formikProps.errors.name && formikProps.touched.name) ||
                      error
                        ? "error"
                        : ""
                    }
                  />
                  <span style={{ color: "red" }}>
                    <ErrorMessage name="name" />
                  </span>
                </div>
                <div className="cont-input">
                  <label htmlFor="email">Email:</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    className={
                      (formikProps.errors.email && formikProps.touched.email) ||
                      error
                        ? "error"
                        : ""
                    }
                  />
                  <span style={{ color: "red" }}>
                    <ErrorMessage name="email" />
                  </span>
                </div>
                <div className="cont-input">
                  <label htmlFor="dni">Dni:</label>
                  <Field
                    type="number"
                    name="dni"
                    placeholder="12345678"
                    className={
                      (formikProps.errors.dni && formikProps.touched.dni) ||
                      error
                        ? "error"
                        : ""
                    }
                  />
                  <span style={{ color: "red" }}>
                    <ErrorMessage name="dni" />
                  </span>
                </div>
                <div className="cont-input">
                  <label htmlFor="birthdate">Fecha de nacimiento:</label>
                  <Field
                    type="date"
                    name="birthdate"
                    placeholder="YYYY/MM/DD"
                    className={
                      (formikProps.errors.birthdate &&
                        formikProps.touched.birthdate) ||
                      error
                        ? "error"
                        : ""
                    }
                  />
                  <span style={{ color: "red" }}>
                    <ErrorMessage name="birthdate" />
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
                <div className="cont-input">
                  <label htmlFor="profileImg">
                    Imagen de perfil: (opcional)
                  </label>
                  <input
                    type="file"
                    name="profileImg"
                    accept="image/*"
                    id="profileImg"
                    onChange={(event) => {
                      formikProps.setFieldValue(
                        "profileImg",
                        event.target.files[0]
                      );
                    }}
                  />
                </div>
                {error && <p className="text-red-600">¡{error}!</p>}
                <div className="cont-btn flex w-full justify-center mb-5">
                  <button
                    type="submit"
                    className=" bg-none font-bold rounded-3xl md:text-base md:py-2 md:px-5 hover:cursor-pointer text-sm py-1.5 px-4"
                  >
                    Registrarse
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <p>
            ¿Ya tienes una cuenta?
            <Link to="/login" className="no-underline">
              Ingresar
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
