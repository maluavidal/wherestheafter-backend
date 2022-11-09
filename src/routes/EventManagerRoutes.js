
import { Router } from 'express';
import eventManagerController from '../controllers/EventManagerController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// if isAdmin
router.get('/', eventManagerController.index);
router.get('/:id', eventManagerController.show);
router.post('/', loginRequired, eventManagerController.store);
router.put('/:id', loginRequired, eventManagerController.update);
router.delete('/:id', loginRequired, eventManagerController.delete);

export default router;
