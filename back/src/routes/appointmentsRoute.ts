import { Router } from "express";
import appointmentController from "../controllers/appointmentsController";

const appointRoute: Router = Router();

appointRoute.get("/", appointmentController.getAppoints);

appointRoute.get("/:id", appointmentController.getOneAppoint); 

appointRoute.post("/schedule", appointmentController.createAppoint);

appointRoute.put("/cancel/:id", appointmentController.updateAppoint);

appointRoute.delete("/delete/:id", appointmentController.deleteAppointment)  //extra credit

export default appointRoute;
