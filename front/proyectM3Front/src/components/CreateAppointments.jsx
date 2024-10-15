import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  getTomorrowDate,
  timeOptions,
  validateAppointment,
} from "../helpers/validate";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { createAppointment, fetchUserData } from "../redux/appointmentSlice";

const CreateAppointments = () => {
  const user = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = dispatch(
        createAppointment({
          ...values,
          userId: user.user.id,
        })
      );
      resetForm();
      swal({
        title: "Turno creado con éxito!",
        text: "Haz creado un turno correctamente!",
        icon: "success",
        button: "OK!",
      });
       dispatch(fetchUserData(user.user.id));
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <>
      <div className="w-11/12 mx-auto">
        <h3 className="text-xl text-left mb-3 font-medium">
          Crear un nuevo turno:
        </h3>
        <Formik
          initialValues={{ date: "", time: "", description: "" }}
          validate={validateAppointment}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form className="flex w-full gap-3 h-full flex-col sm:flex-row">
              <div className="cont-input-appointment">
                <Field
                  type="date"
                  name="date"
                  min={getTomorrowDate()}
                  className={
                    (formikProps.errors.date && formikProps.touched.date) ||
                    error
                      ? "error"
                      : ""
                  }
                />
                <span style={{ color: "red" }}>
                  <ErrorMessage name="date" />
                </span>
              </div>
              <div className="cont-input-appointment">
                <Field
                  type="time"
                  name="time"
                  className={
                    (formikProps.errors.time && formikProps.touched.time) ||
                    error
                      ? "error"
                      : ""
                  }
                  list="time-options"
                />
                <datalist id="time-options">
                  {timeOptions.map((time, index) => (
                    <option key={index} value={time} />
                  ))}
                </datalist>
                <span style={{ color: "red" }}>
                  <ErrorMessage name="time" />
                </span>
              </div>
              <div className="cont-input-appointment">
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Descripción del turno"
                  className={`resize-none overflow-y-hidden ${
                    formikProps.errors.description &&
                    formikProps.touched.description
                      ? "error"
                      : ""
                  }`}
                />
                <span style={{ color: "red" }}>
                  <ErrorMessage name="description" />
                </span>
              </div>
              {error ? <p className="text-red-600">¡{error}!</p> : ""}
              <div className="cont-btn flex h-10 justify-center ">
                <button
                  type="submit"
                  className="bg-none rounded-3xl text-base py-1 sm:px-3 hover:cursor-pointer  px-4"
                >
                  Crear
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreateAppointments;
