import EventManager from "../models/EventManager";

class EventManagerController {
	async index(req, res) {
		const eventManagers = await EventManager.findAll({
			attributes: ['id', 'name', 'email'],
			order: [['id', 'ASC']]
		});
		res.json(eventManagers);
	}
}

export default new EventManagerController();
