import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import appointmentSlice from "./appointmentSlice";

const store = configureStore({
  reducer: { 
    user: userSlice, 
    userAppointments: appointmentSlice
},
});

export default store