import * as Yup from 'yup';

const schema = {
	store: {
		body: Yup.object().shape({
            card_number: Yup.string(16).required(),
            expiration_date: Yup.string().required(),
            security_code: Yup.string(3).required(),
            cardholder_name: Yup.string().required(),
            cardholder_birthdate: Yup.date().required(),
            cpf: Yup.string(11).required(),
			payment_method: Yup.string().required()
		}).noUnknown(),
		params: Yup.object().shape({
			client_id: Yup.number().required(),
			event_id: Yup.number().required()
		})
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
