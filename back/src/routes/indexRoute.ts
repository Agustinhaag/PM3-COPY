import { Router } from "express";
import userRoute from "./userRoute";
import appointRoute from "./appointmentsRoute";

const route: Router = Router()

route.use("/users", userRoute)
route.use("/appointments", appointRoute)

export default route