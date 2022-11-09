import { Router } from 'express';
import eventsClientsController from '../controllers/EventsClientsController';

const router = new Router();

router.get('/', eventsClientsController.index);
router.get('/:id', eventsClientsController.show);
router.post('/', eventsClientsController.store);
router.put('/:id', eventsClientsController.update);
router.delete('/:id', eventsClientsController.delete);

export default router;
