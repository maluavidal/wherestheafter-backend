import * as Yup from 'yup';

const schema = {
	store: {
		body: Yup.object().shape({
            name: Yup.string().required(),
            cpf: Yup.string().required(),
            email: Yup.string().email().required(),
            born_at: Yup.date().required(),
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
            cpf: Yup.string(),
            email: Yup.string().email(),
            born_at: Yup.date(),
		}).noUnknown(),
	},

	delete: {
		params: Yup.object().shape({
            id: Yup.number().integer().required(),
		}).noUnknown(),
	}
}

export default schema;
