import * as Yup from 'yup';

const schema = {
	list: {
		query: Yup.object().shape({
			name: Yup.string().nullable(),
			city: Yup.string(),
			starts_at: Yup.date(),
			ends_at: Yup.date(),
		}).noUnknown(),
	},

	paginateList: {
		query: Yup.object().shape({
			page:Yup.number().required(),
			search_text: Yup.string().nullable(),
			start_date: Yup.date().nullable(),
			end_date: Yup.date().nullable(),
			status: Yup.string().nullable()
		}).noUnknown()
	},

	getAddress: {
		query: Yup.object().shape({
			cep:Yup.string().nullable(),
		}).noUnknown()
	},

	store: {
		body: Yup.object().shape({
            name: Yup.string().required(),
            about: Yup.string().nullable(),
            starts_at: Yup.date().required(),
            ends_at: Yup.date().nullable(),
			min_age: Yup.number(),
			cep: Yup.string().nullable(),
			state: Yup.string().required(),
			city: Yup.string().required(),
			street: Yup.string().nullable(),
			price: Yup.number().nullable(),
			user_id: Yup.number().nullable(),
			number: Yup.string().min(1).required(),
			venue: Yup.string().required(),
			tickets_amount: Yup.number().integer().required(),
			status: Yup.string().nullable(),
			// file: Yup.object().shape({
				// fieldname: Yup.string().required(),
				// originalname: Yup.string().required(),
				// mimetype: Yup.string().oneOf(['image/png', 'image/jpeg, image/jpg']).required(),
				// filename: Yup.string().required(),
			//   }).required()
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
            name: Yup.string().required(),
            about: Yup.string().nullable(),
            starts_at: Yup.date().required(),
            ends_at: Yup.date().required(),
			min_age: Yup.number().integer().nullable(),
			address_cep: Yup.string().nullable(),
			state: Yup.string().required(),
			city: Yup.string().nullable(),
			street: Yup.string().nullable(),
			price: Yup.number().nullable(),
			user_id: Yup.number().nullable(),
			number: Yup.string().min(1).nullable(),
			venue: Yup.string().required(),
			tickets_amount: Yup.number().integer().required(),
			status: Yup.string().nullable()
		}).noUnknown(),
	},

	delete: {
		params: Yup.object().shape({
            id: Yup.number().integer().required(),
		}).noUnknown(),
	}
}

export default schema;
