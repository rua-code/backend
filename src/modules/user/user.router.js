import { Router } from "express";
import { getUser } from "./user.controller";


router.get('/getUser',getUser); 