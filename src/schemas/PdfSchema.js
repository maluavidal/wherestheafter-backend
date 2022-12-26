import * as Yup from 'yup';

const schema = {
	index: {
		params: Yup.object().shape({
            payment_id: Yup.number().integer().required(),
		}).noUnknown(),
	}
}

export default schema;
