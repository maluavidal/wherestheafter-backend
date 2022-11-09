import { Router } from 'express';
import clientController from '../controllers/ClientController';

const router = new Router();

router.get('/', clientController.index);
router.get('/:id', clientController.show);
router.post('/', clientController.store);
router.put('/:id', clientController.update);
router.delete('/:id', clientController.delete);

export default router;
