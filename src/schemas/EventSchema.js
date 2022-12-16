import * as Yup from 'yup';

const schema = {
	list: {
		query: Yup.object().shape({
			city: Yup.string(),
			starts_at: Yup.date(),
			ends_at: Yup.date(),
		}).noUnknown(),
	},

	store: {
		body: Yup.object().shape({
            name: Yup.string().required(),
            about: Yup.string(),
            starts_at: Yup.date().required(),
            ends_at: Yup.date(),
			min_age: Yup.number().integer(),
			address_cep: Yup.string().required(),
			state: Yup.string().required(),
			city: Yup.string().required(),
			street: Yup.string(),
			price: Yup.number(),
			user_id: Yup.number(),
			number: Yup.string().min(1).required(),
			venue: Yup.string().required(),
		}).noUnknown(),
	},

	show: {
		params: Yup.object().shape({
            id: Yup.number().integer().required(),
		}).noUnknown(),
	},

	update: {
		params: Yup.object().shape({
            id: Yup.number().integer().required(),
		}).noUnknown(),

		body: Yup.object().shape({
            name: Yup.string(),
            about: Yup.string(),
            starts_at: Yup.date(),
            ends_at: Yup.date(),
			min_age: Yup.number().integer(),
			address_cep: Yup.string(),
			state: Yup.string(),
			city: Yup.string(),
			street: Yup.string(),
			price: Yup.number(),
			user_id: Yup.number(),
			number: Yup.string().min(1),
			venue: Yup.string()
		}).noUnknown(),
	},

	delete: {
		params: Yup.object().shape({
            id: Yup.number().integer().required(),
		}).noUnknown(),
	}
}

export default schema;
