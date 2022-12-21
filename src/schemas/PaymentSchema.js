import * as Yup from 'yup';

const schema = {
	store: {
		body: Yup.object().shape({
            card_number: Yup.string().required(16),
            expiration_date: Yup.date().required(),
            security_code: Yup.string(3).required(),
            cardholder_name: Yup.string().required(),
            cardholder_birthdate: Yup.date().required(),
            cpf: Yup.string(11).required(),
			client_id: Yup.number()
		}).noUnknown(),
	},

	show: {
		params: Yup.object().shape({
            id: Yup.number().integer().required(),
		}).noUnknown(),
	},

	// update: {
	// 	params: Yup.object().shape({
    //         id: Yup.number().integer().required(),
	// 	}).noUnknown(),

	// 	body: Yup.object().shape({
    //         card_number: Yup.string(),
    //         expiration_date: Yup.date(),
    //         security_code: Yup.string(3),
    //         cardholder_name: Yup.string(),
    //         cardholder_birthdate: Yup.date(),
    //         cpf: Yup.string(11),
	// 	}).noUnknown(),
	// },

	delete: {
		params: Yup.object().shape({
            id: Yup.number().integer().required(),
		}).noUnknown(),
	}
}

export default schema;
