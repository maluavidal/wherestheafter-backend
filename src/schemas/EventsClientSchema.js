import * as Yup from 'yup';

const schema = {
	store: {
		body: Yup.object().shape({
			payment_method: Yup.string().nullable(),
			event_id: Yup.number(),
			client_id: Yup.number(),
		})
	},

	show: {
		params: Yup.object().shape({
            id: Yup.number().integer().required(),
		}).noUnknown(),
	},

	showEvent: {
		params: Yup.object().shape({
            event_id: Yup.number().integer().required(),
		}).noUnknown(),
	},

	update: {
		params: Yup.object().shape({
            id: Yup.number().integer().required(),
		}).noUnknown(),

		body: Yup.object().shape({
			payment_method: Yup.string().nullable(),
			event_id: Yup.number(),
			client_id: Yup.number(),
		})
	},

	delete: {
		params: Yup.object().shape({
            id: Yup.number().integer().required(),
		}).noUnknown(),
	}
};

export default schema;
