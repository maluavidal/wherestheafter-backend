import * as Yup from 'yup';

const schema = {
	profile: {
		params: Yup.object().shape({
			user_id: Yup.number().integer().required()
		}).noUnknown()
	},

	store: {
		body: Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
			password: Yup.string().required(),
			is_admin: Yup.boolean()
		}).noUnknown(),
	},

	show: {
		params: Yup.object().shape({
            id: Yup.number().integer().required(),
		}).noUnknown(),
	},

	update:{
		params: Yup.object().shape({
            id: Yup.number().integer().required(),
		}).noUnknown(),
		body: Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
			password: Yup.string(),
			is_admin: Yup.boolean()
		}).noUnknown(),
	},

	delete: {
		params: Yup.object().shape({
            id: Yup.number().integer().required(),
		}).noUnknown(),
	}
}

export default schema;
