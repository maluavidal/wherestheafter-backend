import { Router } from 'express';
import eventController from '../controllers/EventController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', eventController.index);
router.get('/:id', eventController.show);
router.post('/', loginRequired, eventController.store);
router.put('/:id', loginRequired, eventController.update);
router.delete('/:id', loginRequired, eventController.delete);

export default router;
