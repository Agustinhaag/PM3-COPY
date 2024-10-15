import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "../styles/appointments.css";
import emailjs from "emailjs-com";
import { validarContact } from "../helpers/validate";

const Contact = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const publicKey = import.meta.env.VITE_PUBLICKEY;
  const templateId = import.meta.env.VITE_TEMPLATEID;
  const serviceId = import.meta.env.VITE_SERVICEID;

  return (
    <main className="contact bg-cover">
      <section className="main">
        {formSubmit ? (
          <div className="flex flex-col items-center justify-center h-64 w-full">
            <h3 className="italic text-xl">
              Muchas gracias por comunicarse con nosotros!
            </h3>
            <p className="my-4">En breve nos pondremos en contacto.</p>
            <div className="cont-btn flex w-2/3 justify-end mb-5">
              <button
                className=" bg-none rounded-3xl md:text-base md:py-2 md:px-5 hover:cursor-pointer text-sm py-1.5 px-4"
                onClick={() => {
                  setFormSubmit(false);
                }}
              >
                Volver
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-center md:my-4 mx-0 md:text-3xl underline-offset-4 text-2xl my-5">
              Contactanos
            </h2>
            <div className="cont-form md:w-2/5 mx-auto  w-1/2 min-w-48">
              <Formik
                initialValues={{
                  email: "",
                  name: "",
                  message: "",
                }}
                validate={validarContact}
                onSubmit={(values, { resetForm }) => {
                  emailjs
                    .sendForm(serviceId, templateId, "#form", publicKey)
                    .then((res) => {
                      resetForm();
                      setFormSubmit(true);
                    })
                    .catch((error) => console.log(error));
                }}
              >
                {(formikProps) => (
                  <Form id="form" className="flex flex-col gap-4 items-start">
                    <div className="cont-input">
                      <label htmlFor="email">Email:</label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="example@gmail.com"
                        className={
                          formikProps.errors.email && formikProps.touched.email
                            ? "error"
                            : ""
                        }
                      />
                      <span style={{ color: "red" }}>
                        <ErrorMessage name="email" />
                      </span>
                    </div>
                    <div className="cont-input">
                      <label htmlFor="name">Nombre completo:</label>
                      <Field
                        type="name"
                        name="name"
                        placeholder="Nombre"
                        className={
                          formikProps.errors.name && formikProps.touched.name
                            ? "error"
                            : ""
                        }
                      />
                      <span style={{ color: "red" }}>
                        <ErrorMessage name="name" />
                      </span>
                    </div>
                    <div className="cont-input">
                      <label htmlFor="message">Mensaje:</label>
                      <Field
                        as="textarea"
                        name="message"
                        placeholder="Mensaje"
                        className={`resize-none overflow-y-hidden ${
                          formikProps.errors.message &&
                          formikProps.touched.message
                            ? "error"
                            : ""
                        }`}
                      />
                      <span style={{ color: "red" }}>
                        <ErrorMessage name="message" />
                      </span>
                    </div>

                    <div className="cont-btn flex w-full justify-center mb-5">
                      <button
                        type="submit"
                        className=" bg-none rounded-3xl md:text-base md:py-2 md:px-5 hover:cursor-pointer text-sm py-1.5 px-4"
                      >
                        Enviar
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Contact;