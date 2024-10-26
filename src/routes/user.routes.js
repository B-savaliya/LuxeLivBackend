import express from "express";
import enquiryController from "../controllers/user/enquiry.controller.js";

const userRouter = express.Router();

userRouter.post("/enquiry", enquiryController.validator, enquiryController.handler);

export default userRouter;
