import { User } from '../models';
import Client from '../models/Client';
import BaseController from './BaseController';
import clientService from '../service/ClientService';
import ClientService from '../service/ClientService';

class ClientController extends BaseController {
	constructor() {
		super();

		// this.store = this.index.bind(this);
		// this.store = this.show.bind(this);
		this.store = this.store.bind(this);
		// this.store = this.update.bind(this);
		// this.store = this.delete.bind(this);
	};

    // async index(req, res) {
    //     const clients = await Client.findAll({
    //         order: [['id', 'ASC']]
    //     });

	// 	const clientAmount = await Client.count();

	// 	console.log(clientAmount, 'clientAmount');

    //     const userIsAdmin = await User.findAll({
    //         where: { is_admin: true }
    //     });

    //     const userIsEventManager = await User.findAll({
    //         where: { is_admin: false }
    //     });

    //     if (userIsAdmin) {
    //         return res.json(clients);
    //     } else if (userIsEventManager) {
    //         return res.json(clientAmount);
    //     } else {
    //         return res.status(401).json('Access denied.')
    //     }
    // }

    // async show(req, res) {
    //     const { client_id } = req.params;

    //     const client = await Client.findByPk(client_id);

    //     if (!client) {
    //         return res.status(400).json({ error: 'Client is not existent' });
    //     };

    //     return res.json(client);
    // };

    // async update(res, req) {
    //     const { client_id } = req.params;

    //     const client = await Client.findByPk(client_id);

    //     const schema = Yup.object().shape({
    //         name: Yup.string(),
    //         cpf: Yup.string(),
    //         email: Yup.string().email(),
    //         born_at: Yup.date(),
    //         deleted_at: Yup.date()
    //     });

    //     if (!(await schema.isValid(req.body))) {
    //         return res.status(400).json({ error: 'Validation failed.' })
    //     };
    // }

    async store(req, res) {
		try {

			const client = await ClientService.store(req.data);

			return this.handleSuccess(res, client);
		} catch (error) {
			return this.handleError(res, error);
		}

    };

    // async delete(req, res) {
    //     const { client_id } = req.params;

    //     const client = Client.findByPk(client_id);

    //     const userIsAdmin = await User.findAll({
    //         where: { is_admin: true }
    //     });

    //     if (userIsAdmin) {
    //         if (!client) {
    //             return res.status(400).json({ error: 'Client is not existent' });
    //         };

    //         if (client.user_id !== req.userId) {
    //             return res.status(401).json({ error: 'Unauthorized requisition' });
    //         };

    //         await client.destroy();
    //         return res.json(client);
    //     } else {
    //         return res.status(401).json('Access denied.')
    //     };


    // }
}

export default new ClientController();
