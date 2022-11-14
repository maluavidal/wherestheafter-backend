import * as Yup from 'yup';

const schema = {
	store: {
		body: Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
			password: Yup.string().required()
		}).noUnknown(),
	}
}

export default schema;
