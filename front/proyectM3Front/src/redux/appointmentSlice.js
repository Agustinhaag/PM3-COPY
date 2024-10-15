import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserData = createAsyncThunk(
  "appointments/fetchUserData",
  async (userId, thunkApi) => {
    try {
      const response = await axios.get(`http://localhost:4000/users/${userId}`);
      return response.data.appointments;
    } catch (err) {
      return thunkApi.rejectWithValue({ error: err.message });
    }
  }
);

export const createAppointment = createAsyncThunk(
  "appointments/createAppointment",
  async (appointmentData, thunkApi) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/appointments/schedule",
        appointmentData
      );

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  "appointments/cancelAppointment",
  async (appointmentId, thunkApi) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/appointments/cancel/${appointmentId}`
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  "appointments/deleteAppointment",
  async (appointmentId, thunkApi) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/appointments/delete/${appointmentId}`
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default appointmentSlice.reducer;