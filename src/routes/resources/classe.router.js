import { Router } from "express";

import ClasseController from "../../resources/classe/classe.controllers.js";
import auth from "../../middlewares/auth.js";

const classeRouter = Router();
const classeController = new ClasseController();

classeRouter.post('/request-timeline-hash', auth, classeController.requestTimelineHash);
classeRouter.post('/remove-timeline', auth, classeController.removeTimeline);
classeRouter.post('/presence/:token', auth, classeController.addPresence);
classeRouter.delete('/delete/:id', auth, classeController.removeClasse);
classeRouter.post('/add-timeline', auth, classeController.addTimeline);
classeRouter.post('/create', auth, classeController.createClasse);
classeRouter.get('/', auth, classeController.getClasses);

export default classeRouter;