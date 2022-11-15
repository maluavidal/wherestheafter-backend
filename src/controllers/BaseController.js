export default class BaseController {
	bindActions(actions) {
		actions.forEach(action => {
			this[action] = this[action].bind(this);
		})
	}

	handleSuccess(res, data) {
	  return res.json(data);
	}

	handleError(res, error) {
	  return res.status(401).json({ error: error.massage });
	}
  }
