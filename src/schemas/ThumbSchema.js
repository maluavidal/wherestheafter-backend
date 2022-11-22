import * as Yup from 'yup';

const schema = {
	delete: {
		params: Yup.object().shape({
            id: Yup.number().integer().required(),
		}).noUnknown(),
	}
};

export default schema;
