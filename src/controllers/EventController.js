import * as Yup from 'yup';
import { User } from '../models';

class EventController {
    async index(req, res) {
        const events = await Event.findAll({
            order: [['id', 'ASC']]
        });

        const user = User.findAll();

        if (!user) {
            return res.status(401).json('Access denied.');
        } else {
            return res.json(events);
        };
    };

    async show(req, res) {
        const { event_name } = req.params;

        const event = await Event.findByPk(event_name);

        if (!event) {
            return res.status(400).json({ error: 'Event is not existent' });
        };

        return res.json(event);
    };

    async update(res, req) {
        const { event_id } = req.params;

        const event = await Client.findByPk(event_id);

        const schema = Yup.object().shape({
            name: Yup.string(),
            cpf: Yup.string(),
            email: Yup.string().email(),
            born_at: Yup.date(),
            deleted_at: Yup.date()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation failed.' })
        } else {
            return await event.update(req.body);
        };

    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            cpf: Yup.string().required(),
            email: Yup.string().email().required(),
            born_at: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Failed to fill in all fields correctly." });
        }

        const userIsAdmin = await User.findAll({
            where: { is_admin: true }
        });

        const { client } = req.body;

        if (userIsAdmin) {
            const clients = await Client.create({
                user_id: req.userId,
                client
            });

            return res.json(clients);
        } else {
            return res.status(401).json('Access denied.')
        };
    };

    async delete(req, res) {
        const { client_id } = req.params;

        const client = Client.findByPk(client_id);

        const userIsAdmin = await User.findAll({
            where: { is_admin: true }
        });

        if (userIsAdmin) {
            if (!client) {
                return res.status(400).json({ error: 'Client is not existent' });
            };

            if (client.user_id !== req.userId) {
                return res.status(401).json({ error: 'Unauthorized requisition' });
            };

            await client.destroy();
            return res.json(client);
        } else {
            return res.status(401).json('Access denied.')
        };


    }
}

export default new EventController;
