import express from "express";
import {fetch,create,update,deleteU} from "../controller/userController.js"
const route = express.Router();
route.post("/create",create);
route.get("/getUsers",fetch);
route.put("/update/:id",update);
route.delete("/delete/:id",deleteU);    
export default route