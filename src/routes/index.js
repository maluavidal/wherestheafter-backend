import '../database';
import UserRoutes from './UserRoutes';
import EventRoutes from './EventRoutes';
import ThumbRoutes from './ThumbRoutes';
import ClientRoutes from './ClientRoutes';
import SessionRoutes from './SessionRoutes';
import EventsClientRoutes from './EventsClientRoutes';
import PdfRoutes from './PdfRoutes';
import UserAccessLogRoutes from './UserAccessLogRoutes';
import RecoverPasswordRoutes from './RecoverPasswordRoutes';
import PaymentRoutes from './PaymentRoutes';

import multerConfig from '../config/multerConfig';
import multer from 'multer';
import BaseRoute from './BaseRoute';

class Routes extends BaseRoute {
	setup() {
		const upload = multer(multerConfig);

		this.router.use('/clients', ClientRoutes.setup());
		this.router.use('/session', SessionRoutes.setup());
		this.router.use('/users', UserRoutes.setup());
		this.router.use('/events', EventRoutes.setup(upload));
		this.router.use('/eventsclients', EventsClientRoutes.setup());
		this.router.use('/thumbs', ThumbRoutes.setup());
		this.router.use('/pdf', PdfRoutes.setup());
		this.router.use('/user-access-logs', UserAccessLogRoutes.setup());
		this.router.use('/recover-password', RecoverPasswordRoutes.setup());
		this.router.use('/payments', PaymentRoutes.setup());

		return this.router;
	}
}

export default new Routes();
