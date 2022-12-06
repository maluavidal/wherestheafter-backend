export default class BaseController {
	bindActions(actions) {
		actions.forEach(action => {
			this[action] = this[action].bind(this);
		})
	}

	handleSuccess(res, data) {
	  return res.json(data);
	}

	handleError(res, error, code = 401) {
	  return res.status(code).json({ error: error.message });
	}
  }
