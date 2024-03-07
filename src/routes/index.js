import { Router } from "express";
 
import classeRouter from "./resources/classe.router.js";
import usersRouter from "./resources/users.router.js";

export const router = Router();

router.get("/ping", (req, res) => {
  res.sendStatus(200);
});

router.use('/classe', classeRouter);
router.use('/user', usersRouter);