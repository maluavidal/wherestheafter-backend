import * as Yup from 'yup';

const schema = {
	store: {
		body: Yup.object().shape({
            name: Yup.string().required(),
            about: Yup.string(),
            starts_at: Yup.date().required(),
            ends_at: Yup.date(),
			min_age: Yup.number().integer(),
			address_cep: Yup.string().required(),
			address: Yup.string(),
			address_city: Yup.string(),
			price: Yup.number(),
			user_id: Yup.number(),
			number: Yup.number().min(1).required(),
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
			address: Yup.string(),
			address_city: Yup.string(),
			price: Yup.number(),
			user_id: Yup.number(),
			number: Yup.number().min(1),
		}).noUnknown(),
	},

	delete: {
		params: Yup.object().shape({
            id: Yup.number().integer().required(),
		}).noUnknown(),
	}
}

export default schema;
