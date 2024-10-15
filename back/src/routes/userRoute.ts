import { Router } from "express";
import userController from "../controllers/userController";
import multer from "multer";

const userRoute: Router = Router();

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

userRoute.get("/", userController.getUsers);

userRoute.get("/:id", userController.getOneUser);

userRoute.post(
  "/register",
  upload.single("profileImg"),
  userController.registerUser
);

userRoute.post("/login", userController.loginUser);

export default userRoute;
